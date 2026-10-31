import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

// 1. Scene, camera and renderer
const canvas = document.querySelector('#starfield');

if (!canvas) {
  throw new Error('The #starfield canvas was not found in index.html');
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 2. Create star positions and colours
const starCount = 10000;
const positions = new Float32Array(starCount * 3);
const colors = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {
  const i3 = i * 3;

  positions[i3] = (Math.random() - 0.5) * 200;
  positions[i3 + 1] = (Math.random() - 0.5) * 200;
  positions[i3 + 2] = (Math.random() - 0.5) * 200;

  const color = new THREE.Color();
  color.setHSL(
    0.55 + Math.random() * 0.1,
    0.5 + Math.random() * 0.5,
    0.7 + Math.random() * 0.3
  );

  colors[i3] = color.r;
  colors[i3 + 1] = color.g;
  colors[i3 + 2] = color.b;
}

// 3. Geometry
const geometry = new THREE.BufferGeometry();
geometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
);
geometry.setAttribute(
  'color',
  new THREE.BufferAttribute(colors, 3)
);

// 4. Star appearance
const material = new THREE.PointsMaterial({
  size: 0.35,
  sizeAttenuation: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
  transparent: true,
  opacity: 0.9
});

// 5. Add stars to scene
const stars = new THREE.Points(geometry, material);
scene.add(stars);

// 6. Mouse interaction
let mouseX = 0;
let mouseY = 0;

window.addEventListener('pointermove', (event) => {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});

// 7. Animation loop: smooth parallax rather than accelerating rotation.
function animate() {
  requestAnimationFrame(animate);

  const targetRotationY = mouseX * 0.08;
  const targetRotationX = mouseY * 0.05;

  stars.rotation.y += (targetRotationY - stars.rotation.y) * 0.015 + 0.0002;
  stars.rotation.x += (targetRotationX - stars.rotation.x) * 0.015 + 0.0001;

  renderer.render(scene, camera);
}

animate();

// 8. Responsive resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
