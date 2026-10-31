// Randomly position the existing equations in the hero section.
function placeEquations() {
  const equations = [...document.querySelectorAll(".equations span")];
  const container = document.querySelector(".equations");

  // Stop safely if the expected HTML element is not present.
  if (!container || equations.length === 0) return;

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const placed = [];

  equations.forEach((element) => {
    // Reset first so offsetWidth/offsetHeight are measured consistently.
    element.style.left = "0px";
    element.style.top = "0px";

    const width = element.offsetWidth;
    const height = element.offsetHeight;

    let x = 0;
    let y = 0;
    let attempts = 0;
    let overlapping = false;

    do {
      x = Math.random() * Math.max(0, containerWidth - width);
      y = Math.random() * Math.max(0, containerHeight * 0.7 - height);

      overlapping = placed.some((position) =>
        x < position.x + position.width + 20 &&
        x + width + 20 > position.x &&
        y < position.y + position.height + 15 &&
        y + height + 15 > position.y
      );

      attempts++;
    } while (overlapping && attempts < 100);

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.animationDelay = `${Math.random() * 4}s`;

    placed.push({ x, y, width, height });
  });
}

window.addEventListener("load", placeEquations);
window.addEventListener("resize", placeEquations);
