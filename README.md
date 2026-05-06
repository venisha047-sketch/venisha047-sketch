# The AI Universe

A cinematic, interactive portfolio for Venisha Trivedi — built as a guided world rather than a scroll page. Visitors enter through a portal, the world opens, and they navigate six zones via an interactive map hub.

## First deliverable

This prototype ships the three finished moments from the build brief:

1. **The Door** — portal entry hero with name, role, invitation, and the "Open the Universe" CTA.
2. **The World Opens** — floating-city reveal with the six-zone preview.
3. **The World Map Hub** — interactive SVG hotspots over the labeled world map, each opening a floating zone panel.

Zone panels exist for all six destinations (Skill Realm, Build Lab, Research Tower, Agency Floor, Playground, Signal). Their interiors will be built in the next phase.

## Stack

- React 18 + Vite
- Framer Motion (overlays + panel choreography)
- GSAP (door timeline / portal transition)
- Plain CSS with layered backgrounds, blend modes, and SVG hotspots
- No external state management — three-scene controller in `App.jsx`

## Project structure

```
src/
  App.jsx              scene controller (door → world → hub) + zone panel state
  main.jsx             React entry
  data/zones.js        zone metadata (title, copy, accent, hotspot coords)
  scenes/
    TheDoor.jsx        Scene 0 + 1: arrival and portal
    TheWorldOpens.jsx  Scene 2: floating-city reveal
    WorldMapHub.jsx    Scene 3: SVG hotspots + route
  components/
    StarField.jsx      shared CSS-driven starfield
    ZonePanel.jsx      side overlay revealed on hotspot click
  styles/global.css    full visual system
public/
  images/              drop the 3 world anchor images here (see images/README.md)
  favicon.svg
```

## Run locally

```
npm install
npm run dev
```

The dev server boots on `http://localhost:5173`. Build with `npm run build`, preview with `npm run preview`.

## Image system

The scenes layer fixed background gradients on top of three world anchor images. Place the files at:

- `public/images/generated-image-10.jpg` — The Door (portal entry)
- `public/images/generated-image-7.jpg` — The World Opens (horizon)
- `public/images/generated-image-9.jpg` — World Map Hub (map composition reference)

The site renders gracefully without them — every scene has a CSS fallback (gradients, glows, particles) so it never goes blank.

## Visual system

- Palette: midnight blue, electric cyan (`#7cdaff`), violet haze (`#b58cff`), soft gold (`#ffd78a`).
- Type: Cormorant Garamond for zone names and display, Inter for body and UI.
- Motion: ceremonial at the door, lighter and exploratory inside the world.

## Interaction model

- **Desktop**: hover hotspots to reveal labels, click to open the side panel. ESC steps back through scenes or closes the panel.
- **Mobile**: nav bar collapses to dots, hotspot labels stay visible, panel takes full width.
- `prefers-reduced-motion` short-circuits all animation.

## Next phase

- Build interiors for each zone (Skill Realm tree, Build Lab capsules, Research Tower floors, Agency Floor command center, Playground prompt altar, Signal beacon).
- Add ambient sound and a reduced-motion-aware mute toggle.
- Wire the Playground console to a live model endpoint.
