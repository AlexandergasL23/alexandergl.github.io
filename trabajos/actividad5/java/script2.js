import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// 1. CREAR LA ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x20232a);

// 2. CREAR LA CÁMARA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 3. CREAR EL RENDERIZADOR
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. CREAR EL CUBO
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial(); // colores arcoíris
const cubo = new THREE.Mesh(geometry, material);
scene.add(cubo);

// 5. AÑADIR LUCES
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

// 6. AYUDAS VISUALES (opcional)
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(5, 20);
scene.add(gridHelper);

// 7. POSICIONAR LA CÁMARA
camera.position.set(3, 3, 5);
camera.lookAt(0, 0, 0);

// 8. VARIABLES DE ROTACIÓN
let rotacionX = 0;
let rotacionY = 0;
const velocidadRotacionX = 0.01;
const velocidadRotacionY = 0.015;

// 9. FUNCIÓN DE ANIMACIÓN (ROTACIÓN CONTINUA)
function animate() {
    // APLICAR ROTACIÓN (solo cambia la orientación, NO la posición)
    rotacionX += velocidadRotacionX;
    rotacionY += velocidadRotacionY;
    
    cubo.rotation.x = rotacionX;
    cubo.rotation.y = rotacionY;
    
    // DIBUJAR LA ESCENA
    renderer.render(scene, camera);
    
    // PEDIR EL SIGUIENTE CUADRO
    requestAnimationFrame(animate);
}

// INICIAR LA ANIMACIÓN
animate();

// 10. AJUSTE RESPONSIVO
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});