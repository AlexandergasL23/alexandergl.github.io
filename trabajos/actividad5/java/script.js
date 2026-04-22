import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// 1. CREAR LA ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x20232a); // fondo oscuro

// 2. CREAR LA CÁMARA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 3. CREAR EL RENDERIZADOR
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. CREAR EL CUBO
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial(); // material colorido
const cubo = new THREE.Mesh(geometry, material);
scene.add(cubo);

// 5. AÑADIR LUZ (para que se vea mejor)
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Luz ambiental para iluminar todas las caras
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

// 6. POSICIONAR LA CÁMARA
camera.position.z = 5;

// 7. VARIABLES PARA EL MOVIMIENTO AUTOMÁTICO (TRASLACIÓN EN X)
let direccion = 1;     // 1 = derecha, -1 = izquierda
const velocidad = 0.05;
const limiteIzquierdo = -3;
const limiteDerecho = 3;

// 8. FUNCIÓN DE ANIMACIÓN
function animate() {
    // MOVER EL CUBO EN EL EJE X
    let nuevaPosX = cubo.position.x + (direccion * velocidad);
    
    // REVISAR LÍMITES Y CAMBIAR DIRECCIÓN
    if (nuevaPosX >= limiteDerecho) {
        nuevaPosX = limiteDerecho;
        direccion = -1;  // cambiar a izquierda
    }
    if (nuevaPosX <= limiteIzquierdo) {
        nuevaPosX = limiteIzquierdo;
        direccion = 1;   // cambiar a derecha
    }
    
    // APLICAR LA TRASLACIÓN (solo modifica la coordenada X)
    cubo.position.x = nuevaPosX;
    
    // DIBUJAR LA ESCENA
    renderer.render(scene, camera);
    
    // PEDIR EL SIGUIENTE CUADRO
    requestAnimationFrame(animate);
}

// INICIAR LA ANIMACIÓN
animate();

// 9. AJUSTE RESPONSIVO (cuando se cambia el tamaño de la ventana)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});