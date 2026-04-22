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

// 6. AYUDAS VISUALES
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(8, 20);
scene.add(gridHelper);

// 7. POSICIONAR LA CÁMARA
camera.position.set(4, 4, 6);
camera.lookAt(0, 0, 0);

// 8. CONTROLES POR TECLADO
window.addEventListener('keydown', (event) => {
    switch(event.key) {
        // ===== TRASLACIÓN (movimiento) =====
        case 'ArrowUp':
            cubo.position.y += 0.2;  // mover arriba
            break;
        case 'ArrowDown':
            cubo.position.y -= 0.2;  // mover abajo
            break;
        case 'ArrowLeft':
            cubo.position.x -= 0.2;  // mover izquierda
            break;
        case 'ArrowRight':
            cubo.position.x += 0.2;  // mover derecha
            break;
        
        // ===== ROTACIÓN (orientación) =====
        case 'q':
        case 'Q':
            cubo.rotation.y -= 0.1;  // rotar izquierda
            break;
        case 'e':
        case 'E':
            cubo.rotation.y += 0.1;  // rotar derecha
            break;
        
        // ===== ESCALADO (tamaño) =====
        case 'z':
        case 'Z':
            cubo.scale.x += 0.1;
            cubo.scale.y += 0.1;
            cubo.scale.z += 0.1;
            break;
        case 'x':
        case 'X':
            cubo.scale.x = Math.max(0.2, cubo.scale.x - 0.1);
            cubo.scale.y = Math.max(0.2, cubo.scale.y - 0.1);
            cubo.scale.z = Math.max(0.2, cubo.scale.z - 0.1);
            break;
    }
});

// 9. FUNCIÓN DE ANIMACIÓN
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// 10. AJUSTE RESPONSIVO
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Mensaje en consola
console.log('🎮 Controles activos: FLECHAS(mover) | Q/E(rotar) | Z/X(escalar)');