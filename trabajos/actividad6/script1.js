import * as THREE from 'three';

// ============================================
// PARTE 1: CURVA PARAMÉTRICA 3D
// ============================================

// Crear la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f0f1a);

// Crear la cámara
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.set(3.5, 2.5, 4.5);
camera.lookAt(0, 0, 0);

// Crear el renderizador
const container = document.getElementById('canvas-container');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// ===== ILUMINACIÓN =====
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(2, 5, 3);
scene.add(dirLight);

const pointLight = new THREE.PointLight(0xff44aa, 0.5);
pointLight.position.set(2, 1, 3);
scene.add(pointLight);

// ===== AYUDAS VISUALES =====
const axesHelper = new THREE.AxesHelper(2.5);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(6, 15, 0x88aaff, 0x335588);
gridHelper.position.y = -1.2;
scene.add(gridHelper);

// ===== CREAR LA CURVA PARAMÉTRICA =====
const puntos = [];
const numPuntos = 180;

for (let i = 0; i <= numPuntos; i++) {
    const t = i / numPuntos;
    const angulo = t * Math.PI * 6;
    const radio = 1.5 * (1 - t * 0.6);
    const x = Math.cos(angulo) * radio;
    const z = Math.sin(angulo) * radio;
    const y = Math.sin(angulo * 2) * 0.8 * (1 - t * 0.4);
    
    puntos.push(new THREE.Vector3(x, y, z));
}

const curvaGeometry = new THREE.BufferGeometry();
const vertices = [];
puntos.forEach(p => {
    vertices.push(p.x, p.y, p.z);
});
curvaGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));

const curvaMaterial = new THREE.LineBasicMaterial({ color: 0xff66cc });
const curvaLinea = new THREE.Line(curvaGeometry, curvaMaterial);
scene.add(curvaLinea);

// ===== ESFERA QUE RECORRE LA CURVA =====
const esferaGeometry = new THREE.SphereGeometry(0.1, 24, 24);
const esferaMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffaa44, 
    emissive: 0x442200
});
const esfera = new THREE.Mesh(esferaGeometry, esferaMaterial);
scene.add(esfera);

const luzSeguimiento = new THREE.PointLight(0xff6600, 0.6, 6);
scene.add(luzSeguimiento);

// ===== ESTRELLAS DE FONDO =====
const estrellasGeometry = new THREE.BufferGeometry();
const estrellasPosiciones = [];
for (let i = 0; i < 400; i++) {
    estrellasPosiciones.push((Math.random() - 0.5) * 150);
    estrellasPosiciones.push((Math.random() - 0.5) * 80);
    estrellasPosiciones.push((Math.random() - 0.5) * 60 - 30);
}
estrellasGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(estrellasPosiciones), 3));
const estrellasMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.06 });
const estrellas = new THREE.Points(estrellasGeometry, estrellasMaterial);
scene.add(estrellas);

// ===== ANIMACIÓN =====
let progreso = 0;
const velocidad = 0.004;

function animateCurva() {
    progreso += velocidad;
    if (progreso >= 1) progreso = 0;
    
    const index = Math.floor(progreso * (numPuntos - 1));
    const posicion = puntos[index];
    
    if (posicion) {
        esfera.position.copy(posicion);
        luzSeguimiento.position.copy(posicion);
    }
    
    renderer.render(scene, camera);
    requestAnimationFrame(animateCurva);
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

animateCurva();

// ============================================
// PARTE 2: LISTA DE DOCUMENTOS
// ============================================

// 📌 LISTA DE DOCUMENTOS - ACTUALIZA AQUÍ TUS ARCHIVOS
const documentos = [
    "documento1.pdf",
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
        contenedor.innerHTML = '<div class="vacio">📭 No hay documentos</div>';
        return;
    }
    
    let html = '<h3>📚 CURVAS PARAMETRICAS </h3><ul>';
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