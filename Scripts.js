/* Mouse position variables for the glow and CSS star parallax. */
const root = document.documentElement;

window.addEventListener("pointermove", (event) => {
  // Normalized position: -0.5 at left/top, +0.5 at right/bottom.
  root.style.setProperty("--mx", event.clientX / window.innerWidth - 0.5);
  root.style.setProperty("--my", event.clientY / window.innerHeight - 0.5);

  // Exact pointer coordinates for the soft spotlight.
  root.style.setProperty("--px", `${event.clientX}px`);
  root.style.setProperty("--py", `${event.clientY}px`);
});
