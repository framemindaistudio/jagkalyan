"use client";

import dynamic from "next/dynamic";
import { useCallback, useState, useSyncExternalStore } from "react";
import { EarthCss } from "./earth-css";
import { cn } from "@/lib/cn";

/*
  three.js plus three 2K textures is far too much to put in front of first
  paint, and the hero has to be on screen immediately. So the CSS Earth
  renders instantly and the real globe is fetched in the background; when
  it has actually finished loading its textures it cross-fades in over the
  top. Nobody sees a hole, and a device that cannot run WebGL — or a
  network that never delivers the textures — simply keeps the CSS one
  forever, with no error state to design.
*/
const EarthGlobe = dynamic(
  () => import("./earth-globe").then((m) => m.EarthGlobe),
  { ssr: false },
);

const noopSubscribe = () => () => {};

/**
 * Read a browser-only fact without a state-setting effect.
 *
 * These values don't exist during SSR, so the server snapshot is always
 * `false` and the real value arrives on the first client render. Doing this
 * with useEffect + setState would render once with the wrong answer and
 * then immediately re-render — which is both a wasted pass and what the
 * `react-hooks/set-state-in-effect` rule exists to prevent.
 */
function useBrowserFlag(
  getSnapshot: () => boolean,
  subscribe: (onChange: () => void) => () => void = noopSubscribe,
) {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/*
  Gate on device capability before pulling ~600KB of texture and a 3D
  renderer. `deviceMemory` is Chromium-only; when it is missing we fall back
  to core count, and when that is missing too we assume capable — the globe
  degrades to the CSS one anyway, so a wrong guess is cheap.
*/
function isCapableDevice() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const weak =
    (nav.deviceMemory !== undefined && nav.deviceMemory < 4) ||
    (navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency <= 2);
  return !weak;
}

export function Earth({ className }: { className?: string }) {
  const [ready, setReady] = useState(false);

  const reduced = useBrowserFlag(
    () => window.matchMedia(REDUCED_QUERY).matches,
    subscribeReducedMotion,
  );
  const capable = useBrowserFlag(isCapableDevice);

  const handleReady = useCallback(() => setReady(true), []);

  return (
    <div className={cn("relative aspect-square", className)}>
      {/*
        Placeholder and permanent fallback. Fades out only once the real
        globe reports its textures decoded.

        Inset to match the 3D globe's apparent size. The WebGL camera keeps
        headroom around the sphere so the atmosphere shell isn't cropped, so
        the rendered disc covers only ~78% of the box. Without the same inset
        here, the planet would visibly shrink at the moment of cross-fade.
      */}
      <div
        className={cn(
          "absolute inset-[11%] transition-opacity duration-1000 ease-out",
          ready ? "opacity-0" : "opacity-100",
        )}
      >
        <EarthCss className="h-full w-full" />
      </div>

      {capable && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-out",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <EarthGlobe spin={!reduced} onReady={handleReady} />
        </div>
      )}
    </div>
  );
}
