# Reorganized portfolio files

## Setup
1. Keep your existing `images` folder beside `index.html`.
2. Make sure these existing image paths are present:
   - `images/me.png`
   - `images/Certificates/nptel.png`
   - `images/Certificates/nptel.jpg`
   - `images/Certificates/yess.png`
3. Open this folder in VS Code and run `index.html` with Live Server.

## Active files
- `index.html`: page structure and your existing portfolio content.
- `Styles.css`: grouped styles, responsive About layout, background layers.
- `equationsflow.js`: random equation placement.
- `Scripts.js`: mouse coordinates for CSS glow/parallax.
- `CometTrail.js`: mouse-following comet trail.
- `Spacemotionbg.js`: Three.js starfield and smooth mouse parallax.
- `profile.json`: copied unchanged; it is not currently used to populate the HTML.

## Legacy file
`legacy/script.js` is your original uploaded script.js. It is not loaded because it expects IDs and JSON fields that your current page does not have. Keep it as a reference; do not add it as a script tag.

## Notes
- The NPTEL preview and full-size paths are retained exactly as they appeared in your HTML. Check that both files exist.
- Your uploaded portrait is referenced as `images/me.png`; the image itself was not part of the uploaded files, so keep your original image in that location.
