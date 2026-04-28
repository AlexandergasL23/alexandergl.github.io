import * as THREE from 'three';

// ============================================
// PARTE 1: MALLA POLIGONAL 3D (ICOSAEDRO)
// ============================================

// Crear la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f0f1a);

// Crear la cámara
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.set(2.5, 2, 3.5);
camera.lookAt(0, 0, 0);

// Crear el renderizador
const container = document.getElementById('canvas-container');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// ===== ILUMINACIÓN =====
// Luz ambiental
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

// Luz direccional principal
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(2, 3, 2);
scene.add(dirLight);

// Luz de relleno desde atrás
const backLight = new THREE.PointLight(0x4466cc, 0.4);
backLight.position.set(-1, 1, -2);
scene.add(backLight);

// Luz cálida desde abajo
const warmLight = new THREE.PointLight(0xffaa66, 0.3);
warmLight.position.set(0, -2, 1);
scene.add(warmLight);

// ===== AYUDAS VISUALES =====
// Ejes (opcional)
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Cuadrícula en el piso
const gridHelper = new THREE.GridHelper(5, 15, 0x88aaff, 0x335588);
gridHelper.position.y = -1.2;
scene.add(gridHelper);

// ===== CREAR LA MALLA POLIGONAL (ICOSAEDRO) =====
// Un icosaedro tiene 20 caras triangulares
const geometry = new THREE.IcosahedronGeometry(1, 0); // radio 1, detalle 0

// Material principal (semitransparente para ver las aristas)
const material = new THREE.MeshPhongMaterial({
    color: 0x33aa88,
    shininess: 60,
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide
});

const icosaedro = new THREE.Mesh(geometry, material);
scene.add(icosaedro);

// ===== AÑADIR ARISTAS (EDGES) PARA VER LA POLIGONACIÓN =====
const edgesGeo = new THREE.EdgesGeometry(geometry);
const edgesMat = new THREE.LineBasicMaterial({ color: 0xffcc44 });
const wireframe = new THREE.LineSegments(edgesGeo, edgesMat);
icosaedro.add(wireframe);

// ===== AÑADIR VÉRTICES COMO ESFERITAS (opcional, muestra puntos) =====
// Esto ayuda a visualizar que es una malla de polígonos
const verticesPositions = geometry.attributes.position.array;
const vertexGeometry = new THREE.SphereGeometry(0.04, 8, 8);
const vertexMaterial = new THREE.MeshStandardMaterial({ color: 0xff6666 });

for (let i = 0; i < verticesPositions.length; i += 3) {
    const vertex = new THREE.Mesh(vertexGeometry, vertexMaterial);
    vertex.position.set(verticesPositions[i], verticesPositions[i+1], verticesPositions[i+2]);
    icosaedro.add(vertex);
}

// ===== ESTRELLAS DE FONDO =====
const estrellasGeometry = new THREE.BufferGeometry();
const estrellasPosiciones = [];
for (let i = 0; i < 500; i++) {
    estrellasPosiciones.push((Math.random() - 0.5) * 200);
    estrellasPosiciones.push((Math.random() - 0.5) * 100);
    estrellasPosiciones.push((Math.random() - 0.5) * 80 - 40);
}
estrellasGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(estrellasPosiciones), 3));
const estrellasMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
const estrellas = new THREE.Points(estrellasGeometry, estrellasMaterial);
scene.add(estrellas);

// ===== ANIMACIÓN =====
let rotacionX = 0;
let rotacionY = 0;

function animateMalla() {
    // Rotar la malla poligonal
    rotacionX += 0.005;
    rotacionY += 0.008;
    
    icosaedro.rotation.x = rotacionX;
    icosaedro.rotation.y = rotacionY;
    
    renderer.render(scene, camera);
    requestAnimationFrame(animateMalla);
}

function handleResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', handleResize);
handleResize();

// Iniciar animación
animateMalla();

// ============================================
// PARTE 2: LISTA DE DOCUMENTOS
// ============================================

// 📌 LISTA DE DOCUMENTOS - ACTUALIZA AQUÍ TUS ARCHIVOS
const documentos = [
    "documento2.pdf",
];

const carpeta = "archivos/";

function getIcono(archivo) {
    const extension = archivo.split('.').pop().toLowerCase();
    const iconos = {
        'pdf': '📕', 'jpg': '🖼️', 'jpeg': '🖼️', 'png': '🖼️',
        'gif': '🖼️', 'txt': '📝', 'doc': '📘', 'docx': '📘',
        'xls': '📊', 'xlsx': '📊', 'ppt': '📽️', 'pptx': '📽️'
    };
    return iconos[extension] || '📄';
}

function mostrarDocumentos() {
    const contenedor = document.getElementById("lista-documentos");
    
    if (documentos.length === 0) {
        contenedor.innerHTML = '<div class="vacio">📭 No hay documentos disponibles. Agrega archivos a la carpeta "archivos/"</div>';
        return;
    }
    
    let html = '<h3>📚 Mallas Poligonales</h3><ul>';
    for (let i = 0; i < documentos.length; i++) {
        const archivo = documentos[i];
        const ruta = carpeta + archivo;
        const icono = getIcono(archivo);
        
        html += `
            <li>
                <a href="${ruta}" target="_blank">
                    <span class="icono">${icono}</span>
                    <span class="nombre-archivo">${archivo}</span>
                </a>
            </li>
        `;
    }
    html += '</ul>';
    
    contenedor.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', mostrarDocumentos);