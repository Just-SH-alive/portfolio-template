/* Lightweight mouse-following comet trail drawn on its own canvas. */
const cometCanvas = document.getElementById("comet");

if (cometCanvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const cometContext = cometCanvas.getContext("2d");
  const trail = [];
  const maxTrailLength = 24;
  let pointer = { x: -100, y: -100 };
  let animationId;

  function resizeCometCanvas() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    cometCanvas.width = Math.floor(window.innerWidth * pixelRatio);
    cometCanvas.height = Math.floor(window.innerHeight * pixelRatio);
    cometCanvas.style.width = `${window.innerWidth}px`;
    cometCanvas.style.height = `${window.innerHeight}px`;
    cometContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  window.addEventListener("resize", resizeCometCanvas);
  resizeCometCanvas();

  window.addEventListener("pointermove", (event) => {
    pointer = { x: event.clientX, y: event.clientY };
    trail.push({ x: pointer.x, y: pointer.y, life: 1 });

    if (trail.length > maxTrailLength) trail.shift();
  });

  function drawComet() {
    cometContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Keep a few fading points behind the pointer.
    for (let i = trail.length - 1; i >= 0; i--) {
      const point = trail[i];
      point.life -= 0.035;

      if (point.life <= 0) {
        trail.splice(i, 1);
        continue;
      }
    }

    // Draw a glowing line through the recent pointer positions.
    if (trail.length > 1) {
      cometContext.save();
      cometContext.lineCap = "round";
      cometContext.lineJoin = "round";
      cometContext.shadowBlur = 18;
      cometContext.shadowColor = "rgba(76, 195, 255, 0.9)";

      for (let i = 1; i < trail.length; i++) {
        const previous = trail[i - 1];
        const current = trail[i];
        const progress = i / trail.length;

        cometContext.beginPath();
        cometContext.moveTo(previous.x, previous.y);
        cometContext.lineTo(current.x, current.y);
        cometContext.strokeStyle = `rgba(120, 210, 255, ${progress * current.life * 0.75})`;
        cometContext.lineWidth = 1 + progress * 5;
        cometContext.stroke();
      }

      cometContext.restore();
    }

    // Bright comet head.
    if (pointer.x >= 0) {
      const glow = cometContext.createRadialGradient(
        pointer.x, pointer.y, 0,
        pointer.x, pointer.y, 13
      );
      glow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      glow.addColorStop(0.25, "rgba(140, 220, 255, 0.7)");
      glow.addColorStop(1, "rgba(76, 195, 255, 0)");

      cometContext.fillStyle = glow;
      cometContext.beginPath();
      cometContext.arc(pointer.x, pointer.y, 13, 0, Math.PI * 2);
      cometContext.fill();
    }

    animationId = requestAnimationFrame(drawComet);
  }

  drawComet();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animationId = requestAnimationFrame(drawComet);
    }
  });
}
