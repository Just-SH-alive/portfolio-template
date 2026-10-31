const root = document.documentElement;

document.addEventListener("mousemove", (e) => {
  // -0.5 (left/top edge) to +0.5 (right/bottom edge)
  root.style.setProperty("--mx", e.clientX / window.innerWidth - 0.5);
  root.style.setProperty("--my", e.clientY / window.innerHeight - 0.5);
  // exact pixel position
  root.style.setProperty("--px", e.clientX + "px");
  root.style.setProperty("--py", e.clientY + "px");
}); 
