import * as THREE from "three";

export default function initScene(canvas) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
  );

  const renderer = new THREE.WebGLRenderer({ canvas });

  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.MeshBasicMaterial({ color: "white" });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  camera.position.z = 2;

  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
}