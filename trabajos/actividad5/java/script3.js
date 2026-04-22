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
const material = new THREE.MeshNormalMaterial();
const cubo = new THREE.Mesh(geometry, material);
scene.add(cubo);

// 5. AÑADIR LUCES
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

// 6. AYUDAS VISUALES (REDUCIDAS al 40%)
// Cuadrícula más pequeña (antes 8x8, ahora 5x5)
const axesHelper = new THREE.AxesHelper(2.5);  // Reducido de 3 a 2.5
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(5, 15);  // Reducido de 8 a 5
scene.add(gridHelper);

// 7. POSICIONAR LA CÁMARA (más cerca para ver mejor el espacio reducido)
camera.position.set(3, 3, 4.5);  // Más cerca (antes 4,4,6)
camera.lookAt(0, 0, 0);

// 8. LÍMITES DE MOVIMIENTO REDUCIDOS en 40%
// Antes: límite ±3, ahora: límite ±1.8 (40% menos)
const limiteMovimiento = 1.8;  // Reducido de 3 a 1.8

// 9. CONTROLES POR TECLADO (con límites)
window.addEventListener('keydown', (event) => {
    switch(event.key) {
        // ===== TRASLACIÓN (movimiento) CON LÍMITES =====
        case 'ArrowUp':
            if (cubo.position.y + 0.2 <= limiteMovimiento) {
                cubo.position.y += 0.15;  // Movimiento más suave
            }
            break;
        case 'ArrowDown':
            if (cubo.position.y - 0.2 >= -limiteMovimiento) {
                cubo.position.y -= 0.15;
            }
            break;
        case 'ArrowLeft':
            if (cubo.position.x - 0.2 >= -limiteMovimiento) {
                cubo.position.x -= 0.15;
            }
            break;
        case 'ArrowRight':
            if (cubo.position.x + 0.2 <= limiteMovimiento) {
                cubo.position.x += 0.15;
            }
            break;
        
        // ===== ROTACIÓN (sin cambios) =====
        case 'q':
        case 'Q':
            cubo.rotation.y -= 0.1;
            break;
        case 'e':
        case 'E':
            cubo.rotation.y += 0.1;
            break;
        
        // ===== ESCALADO (con límite inferior) =====
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

// 10. FUNCIÓN DE ANIMACIÓN
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// 11. AJUSTE RESPONSIVO
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 12. MENSAJE EN CONSOLA
console.log('🎮 Espacio reducido al 40% | Límites: ±' + limiteMovimiento);
