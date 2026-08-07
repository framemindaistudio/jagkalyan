# JagKalyan Holistic Mission — Resources

Source material for **jagkalyan.com**.

---

## ⚠️ Action needed: the eight infographics

The client sent eight infographic images in chat. **Those files could not be
saved here automatically** — images pasted into a chat conversation are not
files on this machine, so there was no path to copy from.

**Please drop the original files into `client-reference/`** using the names
below. Nothing in the website depends on them (see "How images are used"),
but they are the design source of record and should be archived with the
project.

| # | Image | What it contains | Where it drove the build |
|---|-------|------------------|--------------------------|
| 1 | Mission & Ecosystem poster | Sanskrit blessing, 6 mission values, 5 ecosystem pillars (Mandapam, Matha University, Gurukuls, Seva Park, Udyog Park), Global Movement, 4 entities, vision statement | `/mission`, homepage ecosystem section |
| 2 | Impact of JagKalyan (founder portrait) | Build Self→Society→Nation→Humanity, 8 impact areas, full founder timeline 1967–2026, entities + associates | `/journey`, `/mission`, `lib/site.ts` JOURNEY |
| 3 | Logo | Circular mark — leaves, human figure, 4 holistic + 4 global icons | `components/brand/mark.tsx` |
| 4 | Impact infographic (blue) | Timeline as horizontal rail, 12 impact statements, entities/associates grid, multiplier impact | `/journey`, HOLISTIC + GLOBAL data |
| 5 | JagKalyan Universe (cosmic) | **Primary visual reference.** Find Your Swadharma (Ikigai) core, 4 Build quadrants, 10 orbiting institutions, "how we create impact" flow | The entire cosmic hero — `components/cosmic/` |
| 6 | Unified Vision | 7 institutions with full service lists, approach, impact | `/ecosystem` INSTITUTIONS |
| 7 | Nature charter (green) | Grow trees, save water, save soil, avoid air/space pollution, save environment | `/mission#nature` NATURE_CHARTER |
| 8 | Wisdom Park master plan | 200-acre aerial zoning, 10 zones with acreages | `/wisdom-park`, `components/sections/master-plan.tsx` |

---

## How images are used

Per the client's explicit instruction:

> "Whatever image he has given, I don't want it to be put directly on it.
> I want to re-create it in a UI style or exact framework."

**No client infographic is embedded anywhere in the site.** Every one was read
for its *content and structure*, then rebuilt as live UI:

- The **logo** → hand-drawn SVG (`components/brand/mark.tsx`), tintable, crisp at any size.
- The **Universe diagram** → the scroll-driven cosmic hero, with a CSS/gradient Earth and the four Build pillars on a real orbit.
- The **Wisdom Park aerial** → a CSS-grid master plan (`components/sections/master-plan.tsx`) that is responsive, readable on a phone, keyboard-navigable, and editable in code.
- All **text content** → `website/src/lib/site.ts`, the single source of truth.

This is why the site has no large image payload and needs no art direction pass
to stay sharp on a retina display.

---

## `brand-assets/`

Real files copied from `D:\JK\`:

| File | Note |
|------|------|
| `JagKalyan Logo.jpeg` | Primary mark |
| `Jagkalyan_Holistic_Logo.png` | Holistic Mission lockup |
| `JK Trust Logo.jpeg` | JagKalyan Trust |
| `Nandi Foundation.jpg` | Shree Nandi Foundation |
| `LOGO - JTK.jpeg` | JagKalyan Tarak Gurukul |
| `LOGO Saiccha Developers.jpeg` | Saiccha Developers |
| `Dr. Jagdish Kalyandurgmath (Full).png` | Founder portrait |
| `Dr.Kavita Kalyandurgmath.jpg` | Co-founder |
| `Dr Tarak Arolkar.jpeg` | Co-founder |
| `JagKalyan Tarak Gurukul - Layout 3D.png` | Gurukul campus render |

Also available in `D:\JK\` if needed later: the mission film
(`JagKalyan_Holistic_Mission_FINAL.mp4`), its narration audio, AV scripts, and
the Rudra Valley / Khanyale property plans.

---

## Earth textures

The globe in the cosmic hero uses **NASA Visible Earth** imagery — **public
domain, courtesy NASA Earth Observatory**, no licence fee or attribution
obligation, though the credit line above is kept as good practice.

Sources, downloaded and re-encoded to 2048×1024 WebP in
`website/public/textures/`:

| Shipped file | Source |
|---|---|
| `earth-day.webp` (156KB) | [Blue Marble — land surface, shallow water, topography](https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57752/land_shallow_topo_2048.jpg) |
| `earth-clouds.webp` (336KB, greyscale) | [Blue Marble — cloud composite](https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57747/cloud_combined_2048.jpg) |
| `earth-night.webp` (113KB) | [Earth at Night — city lights](https://eoimages.gsfc.nasa.gov/images/imagerecords/55000/55167/earth_lights_lrg.jpg) |

The cloud map is stored greyscale because it is only ever sampled as an alpha
channel — that alone cut it from 415KB to 336KB.

Higher-resolution sources exist (5400×2700, ~2MB each) if the globe is ever
rendered much larger than its current ~180px on screen. At the current size
2048×1024 is already well beyond what the sphere can show.

---

## Content source of record

All site copy lives in **`website/src/lib/site.ts`** — pillars, the holistic and
global dimensions, the full 1967–2026 journey, entities, associates, the seven
institutions, the nine Academy shalas, Wisdom Park zoning, the nature charter,
navigation, and the Coming Soon route registry.

Change content there, not in the page files.
