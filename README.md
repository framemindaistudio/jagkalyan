# JagKalyan Holistic Mission — jagkalyan.com

The digital platform for the JagKalyan Holistic Mission.
**Build Self · Build Society · Build Nation · Build Humanity.**

This is the **outline release**: the spine of the site is real and complete,
and every module not yet built exists as a real, pre-rendered *Coming Soon*
page rather than a dead link. Modules get promoted one at a time.

```
JagKalyan Holistic Mission/
├── website/      Next.js app  ← deploy this
└── resources/    Client source material + brand assets
```

---

## Run it

```bash
npm install --prefix "website" && npm run dev --prefix "website"
```

Then open http://localhost:3000.

---

## Stack

Next.js 16 · React 19 · Tailwind CSS 4 · Motion · Phosphor Icons · TypeScript.
Matches the sibling [JagKalyan Tarak Gurukul](../JagKalyan%20Tarak%20Gurukul)
site so the two properties share conventions.

No database, no CMS, no auth yet — deliberately. The outline ships static and
fast; those arrive with the modules that need them.

---

## The design system

Two worlds, one system (`website/src/app/globals.css`):

**Stage** — deep near-black cosmic space. Gold is the light of consciousness,
verdant green is life. Used for the mission, the universe, the ecosystem.

**Canvas** — warm cream (`#fbf6ea`), forest green (`#0e4a12`), gold
(`#e4ae14`) — inherited from the Tarak Gurukul site so the family reads as one
brand. Used wherever there is a lot to *read*.

Any section opts into Canvas with `variant="canvas"`. The rule is *museum, not
spaceship*: cosmic where it earns awe, calm where it must be read.

**Type** — Instrument Serif (display) + Inter (body).
DM Sans is preloaded as the alternate pairing the client asked to see: change
`--font-sans` to `var(--font-alt)` in `globals.css` to switch the whole site.

---

## The cosmic hero

`website/src/components/cosmic/` — a 520vh pinned section where scroll *is*
time. Five acts:

1. **Invocation** — the Sanskrit blessing and the name, in empty space
2. **Arrival** — Earth rises out of the dark and comes toward you
3. **Swadharma** — the four Build pillars orbit into place around it
4. **Withdrawal** — the camera pulls back; Earth becomes one point in a wider universe
5. **Creed** — One Humanity · One Planet · Universal Well-being

The Earth is built from gradients and blurred shapes, not a texture or WebGL —
it costs nothing on mobile and reads as a symbol rather than a satellite photo.
The starfield is a single canvas with three parallax depths.

Below `md` the orbit becomes a 2×2 grid beneath the Earth: four labels around
a circle cannot clear it at 375px.

`prefers-reduced-motion` is honoured in both CSS and JS — the sequence
degrades to a static composition.

---

## Adding content

**Everything is in `website/src/lib/site.ts`** — pillars, dimensions, the
1967–2026 journey, entities, associates, institutions, Academy shalas, Wisdom
Park zoning, the nature charter, navigation, and the Coming Soon registry.

Edit that file, not the pages.

### Promoting a Coming Soon module to a real page

1. Create its folder under `website/src/app/<route>/page.tsx`
2. Delete its entry from `STUBS` in `site.ts`
3. If it is in `NAV`, flip its `status` from `"soon"` to `"live"`

Static routes always beat the `[...slug]` catch-all, so step 1 alone makes the
real page win — steps 2 and 3 just clean up the badges and the sitemap.

---

## Deploying

Vercel, root directory `website`. No environment variables required.
Domain `jagkalyan.com` is registered; DNS cutover happens after the preview is
approved.

---

## What's live vs. coming soon

**Live** — Home, The Mission, The Journey, Ecosystem, Academy, Wisdom Park,
Get Involved.

**Coming Soon (real URLs, all pre-rendered)** — About, Holistic Framework,
Projects, Education, Wellness, Innovation, Startup Hub, Sustainability,
Community, Register, Volunteer, Membership, Donate, Corporate CSR, Grants &
Endowment, Knowledge Centre, Events, Media, Partners, Contact, Member Portal.

---

## Known gaps

- **Donations and registration are presentational only.** No payment gateway,
  no form handling, no data storage. The JagKalyan Unique ID card on
  `/get-involved` is a sample format, clearly labelled as illustrative.
- **The eight client infographics are not archived** — see
  `resources/README.md`. They were read and rebuilt as UI, but the original
  files still need to be dropped in.
- No CMS. Content edits are code edits until a CMS module is scoped.
