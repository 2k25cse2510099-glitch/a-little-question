# A Little Question ♡

A cinematic, responsive romantic invitation built with React, Vite, Three.js / React Three Fiber, Framer Motion, GSAP, Tailwind CSS and Lucide React.

## Requirements
- Node.js 18.18+ (Node 20 LTS recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Personalize
Edit `src/config.js`. You can change:
- `herName` and `yourName`
- Opening copy, letter paragraphs, question and both responses
- Closing copy and invitation details
- Theme color tokens
- Optional music path

No main component edits are needed for copy changes. Leave `herName` blank if you prefer not to address her by name.

## Optional background music
1. Use a track you own or are licensed to use.
2. Put it in `public/`, for example `public/music.mp3`.
3. Set `backgroundMusic: '/music.mp3'` in `src/config.js`.
4. The site never starts audio automatically. The visible sound control starts and pauses it only after a click.

## Build and preview
```bash
npm run build
npm run preview
```
The production bundle is created in `dist/`.

## Deploy
- **Vercel:** Import the repository, use build command `npm run build`, output directory `dist`.
- **Netlify:** Build command `npm run build`, publish directory `dist`.
- **Static hosting:** Upload the contents of `dist/` to your host. Configure SPA fallback to `index.html` if your host requires it.

## Project structure
```text
src/
  components/
    Atmosphere.jsx   # React Three Fiber night sky, stars, moon and sparkles
    Envelope.jsx     # Interactive envelope illustration
    Petals.jsx       # Lightweight CSS rose-petal animation
  App.jsx            # Scene orchestration, letter, question and responses
  config.js          # All personal copy and theme settings
  main.jsx
  styles.css
```

## Notes
- The 3D scene is deliberately lightweight and uses a capped device-pixel ratio.
- CSS petals and reduced-motion support keep decorative animation inexpensive.
- The envelope is an original CSS illustration; no external placeholder images are used.
- The letter and answer are local to the visitor's browser. The site does not send or store responses anywhere.
- For privacy and clarity, the “Maybe” option is equally accessible and carries no guilt-inducing interaction.
