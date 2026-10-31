const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let w, h;
const mouse = { x: -9999, y: -9999 };
const stars = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// each star remembers its "home" position (hx, hy)
for (let i = 0; i < 1000; i++) {
  const x = Math.random() * w;
  const y = Math.random() * h;
  stars.push({ hx: x, hy: y, x: x, y: y, r: Math.random() * 1.5 + 0.5 });
}

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function frame() {
  ctx.clearRect(0, 0, w, h);

  for (const s of stars) {
    const dx = s.x - mouse.x;
    const dy = s.y - mouse.y;
    const dist = Math.hypot(dx, dy);

    if (dist < 120 && dist > 0) {         // push away from the mouse
      const push = (120 - dist) / 120;
      s.x += (dx / dist) * push * 6;
      s.y += (dy / dist) * push * 6;
    }

    s.x += (s.hx - s.x) * 0.05;           // ease back home
    s.y += (s.hy - s.y) * 0.05;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "#cfe6ff";
    ctx.fill();
  }

  requestAnimationFrame(frame);           // run again next screen refresh
}
frame();