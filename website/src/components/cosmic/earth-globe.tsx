"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The real Earth — a lit sphere carrying NASA's Blue Marble imagery.
 *
 * Three things do the heavy lifting for realism, and none of them are the
 * texture on its own:
 *
 *  1. A day/night terminator. The globe's shader blends the daytime map
 *     into the city-lights map across the line where the sun falls off.
 *     Cities emerging out of the dusk edge is the single detail that stops
 *     a textured ball reading as a sticker.
 *  2. Clouds on their own shell, rotating fractionally faster than the
 *     surface, so the two layers separate as it turns — real parallax
 *     between weather and ground.
 *  3. Atmospheric scattering on the limb, brightest where the sun grazes
 *     it, so the planet has an edge of air rather than a hard cutout.
 *
 * The sun sits well off to the left rather than behind the camera. Front
 * lighting would flatten it and hide the night side entirely; raking light
 * gives a crescent, a terminator, and a dark hemisphere full of cities.
 */

const SUN = new THREE.Vector3(-0.88, 0.26, 0.4).normalize();

/*
  Framing.

  The globe is radius 1, and the atmosphere shell extends past it. The
  camera has to sit far enough back that the SHELL — not the globe — fits
  inside the frustum, with headroom to spare. Get this wrong and the sphere
  is cropped by the edges of its own canvas and renders as a rounded square.
  (It shipped that way once. Very obvious in hindsight.)

  So the distance is derived from those constants rather than hand-picked,
  which means the shell can be resized without silently re-introducing the
  crop.
*/
const FOV = 32;
const ATMOSPHERE_SCALE = 1.16;
const FRAME_HEADROOM = 1.1;
const CAMERA_DISTANCE =
  (ATMOSPHERE_SCALE * FRAME_HEADROOM) /
  Math.tan(THREE.MathUtils.degToRad(FOV / 2));

const GLOBE_VERT = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const GLOBE_FRAG = /* glsl */ `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform vec3 sunDirection;
  uniform vec3 atmosphere;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 n = normalize(vWorldNormal);
    float sun = dot(n, normalize(sunDirection));

    // The terminator. Widened well past a hard 0.0 boundary because real
    // dusk is a broad band, not a line.
    float dayAmount = smoothstep(-0.14, 0.32, sun);

    vec3 day = texture2D(dayMap, vUv).rgb;
    vec3 night = texture2D(nightMap, vUv).rgb;

    // Ambient floor keeps the dark side from going pure black.
    vec3 dayLit = day * (0.06 + 1.02 * clamp(sun, 0.0, 1.0));

    // City light is sodium-orange, and lifted so it survives the blend.
    vec3 nightLit = night * vec3(1.0, 0.80, 0.52) * 2.1;

    vec3 col = mix(nightLit, dayLit, dayAmount);

    // Rayleigh-ish limb scatter, only where the sun actually reaches.
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float rim = pow(1.0 - max(dot(n, viewDir), 0.0), 3.2);
    col += atmosphere * rim * clamp(sun + 0.28, 0.0, 1.0) * 1.15;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const CLOUD_VERT = GLOBE_VERT;

const CLOUD_FRAG = /* glsl */ `
  uniform sampler2D cloudMap;
  uniform vec3 sunDirection;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    float density = texture2D(cloudMap, vUv).r;
    vec3 n = normalize(vWorldNormal);
    float sun = clamp(dot(n, normalize(sunDirection)), 0.0, 1.0);

    // Clouds must go dark on the night side too, or they float as a
    // glowing shell and give the whole trick away.
    float lit = 0.04 + 0.96 * sun;

    // Fade the shell as it turns away from the viewer so its silhouette
    // doesn't cut a hard circle against space.
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float facing = smoothstep(0.0, 0.42, dot(n, viewDir));

    gl_FragColor = vec4(vec3(lit), density * facing * 0.62);
  }
`;

const ATMO_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ATMO_FRAG = /* glsl */ `
  uniform vec3 glow;
  uniform vec3 sunDirection;
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  void main() {
    // Classic back-face shell glow: strongest where the shell's normal is
    // perpendicular to the view, i.e. exactly at the limb.
    float intensity = pow(0.66 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    float sun = clamp(dot(normalize(vWorldNormal), normalize(sunDirection)) + 0.42, 0.0, 1.0);
    gl_FragColor = vec4(glow, 1.0) * max(intensity, 0.0) * sun;
  }
`;

export function EarthGlobe({
  onReady,
  spin = true,
}: {
  onReady?: () => void;
  spin?: boolean;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  /*
    Mirror the props into refs so the render loop can read the current
    values without the WebGL setup effect depending on them — re-running
    that effect would tear down and rebuild the whole scene on every prop
    change. Synced in effects rather than during render, which React
    forbids for refs.
  */
  const readyRef = useRef(onReady);
  const spinRef = useRef(spin);

  useEffect(() => {
    readyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    spinRef.current = spin;
  }, [spin]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      // No WebGL — the CSS Earth underneath simply stays visible.
      return;
    }

    renderer.setClearAlpha(0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
    camera.position.set(0, 0, CAMERA_DISTANCE);

    // Earth's real axial tilt. Small detail, but a perfectly upright globe
    // reads as a diagram rather than a planet.
    const system = new THREE.Group();
    system.rotation.z = THREE.MathUtils.degToRad(23.4);
    scene.add(system);

    const geometry = new THREE.SphereGeometry(1, 96, 96);

    const loader = new THREE.TextureLoader();
    const load = (url: string, srgb: boolean) =>
      new Promise<THREE.Texture>((resolve, reject) => {
        loader.load(
          url,
          (t) => {
            t.colorSpace = srgb
              ? THREE.SRGBColorSpace
              : THREE.NoColorSpace;
            t.anisotropy = Math.min(
              8,
              renderer.capabilities.getMaxAnisotropy(),
            );
            resolve(t);
          },
          undefined,
          reject,
        );
      });

    let raf = 0;
    let disposed = false;
    const disposables: { dispose: () => void }[] = [geometry];

    const resize = () => {
      const s = Math.max(1, Math.min(mount.clientWidth, mount.clientHeight));
      renderer.setSize(s, s, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    Promise.all([
      load("/textures/earth-day.webp", true),
      load("/textures/earth-night.webp", true),
      load("/textures/earth-clouds.webp", false),
    ])
      .then(([dayMap, nightMap, cloudMap]) => {
        if (disposed) {
          [dayMap, nightMap, cloudMap].forEach((t) => t.dispose());
          return;
        }
        disposables.push(dayMap, nightMap, cloudMap);

        const globeMat = new THREE.ShaderMaterial({
          uniforms: {
            dayMap: { value: dayMap },
            nightMap: { value: nightMap },
            sunDirection: { value: SUN },
            atmosphere: { value: new THREE.Color(0.30, 0.55, 0.95) },
          },
          vertexShader: GLOBE_VERT,
          fragmentShader: GLOBE_FRAG,
        });

        const cloudMat = new THREE.ShaderMaterial({
          uniforms: {
            cloudMap: { value: cloudMap },
            sunDirection: { value: SUN },
          },
          vertexShader: CLOUD_VERT,
          fragmentShader: CLOUD_FRAG,
          transparent: true,
          depthWrite: false,
        });

        const atmoMat = new THREE.ShaderMaterial({
          uniforms: {
            glow: { value: new THREE.Color(0.32, 0.60, 1.0) },
            sunDirection: { value: SUN },
          },
          vertexShader: ATMO_VERT,
          fragmentShader: ATMO_FRAG,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true,
          depthWrite: false,
        });

        disposables.push(globeMat, cloudMat, atmoMat);

        const globe = new THREE.Mesh(geometry, globeMat);
        const clouds = new THREE.Mesh(geometry, cloudMat);
        clouds.scale.setScalar(1.011);
        const atmosphere = new THREE.Mesh(geometry, atmoMat);
        atmosphere.scale.setScalar(ATMOSPHERE_SCALE);

        system.add(globe, clouds, atmosphere);

        // Start part-turned so the Atlantic/Europe face the camera rather
        // than the empty middle of the Pacific.
        globe.rotation.y = -1.2;
        clouds.rotation.y = -1.2;

        resize();
        readyRef.current?.();

        let last = performance.now();
        const tick = (now: number) => {
          const dt = Math.min((now - last) / 1000, 0.05);
          last = now;
          if (spinRef.current) {
            globe.rotation.y += dt * 0.035;
            // Weather outruns the ground — that differential is what sells
            // the two layers as separate things.
            clouds.rotation.y += dt * 0.047;
          }
          renderer.render(scene, camera);
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      })
      .catch(() => {
        // Texture fetch failed; CSS Earth remains as the visible layer.
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
    />
  );
}
