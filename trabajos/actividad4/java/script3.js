// Configuración del canvas
const canvas = document.getElementById('graficoCanvas');
const ctx = canvas.getContext('2d');

// Dimensiones
const width = 800;
const height = 400;

// Variable que avanza con el tiempo
let desplazamiento = 0;

// Configuración de ejes
const margenIzquierdo = 50;
const margenDerecho = 30;
const margenSuperior = 30;
const margenInferior = 40;

const anchoGrafico = width - margenIzquierdo - margenDerecho;
const altoGrafico = height - margenSuperior - margenInferior;

// Rango de valores
const xMin = 0;
const xMax = 4 * Math.PI; // 0 a 4π (2 ciclos completos)
const yMin = -1;
const yMax = 1;

// Escalas
const escalaX = anchoGrafico / (xMax - xMin);
const escalaY = altoGrafico / (yMax - yMin);

// Función para convertir coordenadas
function convertirCoordenadas(x, y) {
    const canvasX = margenIzquierdo + (x - xMin) * escalaX;
    const canvasY = height - margenInferior - (y - yMin) * escalaY;
    return { x: canvasX, y: canvasY };
}

// Función coseno con desplazamiento
function cosenoConDesplazamiento(x) {
    return Math.cos(x + desplazamiento);
}

// Calcular todos los puntos de la curva
function calcularPuntos() {
    const puntos = [];
    const paso = (xMax - xMin) / 200;
    
    for (let x = xMin; x <= xMax; x += paso) {
        const y = cosenoConDesplazamiento(x);
        puntos.push({ x, y });
    }
    
    return puntos;
}

// Dibujar ejes
function dibujarEjes() {
    // Limpiar canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    
    // Eje X
    const origenX = convertirCoordenadas(0, 0);
    ctx.beginPath();
    ctx.moveTo(margenIzquierdo, origenX.y);
    ctx.lineTo(width - margenDerecho, origenX.y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Eje Y
    ctx.beginPath();
    ctx.moveTo(origenX.x, margenSuperior);
    ctx.lineTo(origenX.x, height - margenInferior);
    ctx.stroke();
    
    // Etiquetas
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.fillText('x', width - margenDerecho + 5, origenX.y + 3);
    ctx.fillText('y', origenX.x + 5, margenSuperior - 5);
}

// Dibujar la curva
function dibujarCurva(puntos) {
    if (puntos.length === 0) return;
    
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    
    const primero = convertirCoordenadas(puntos[0].x, puntos[0].y);
    ctx.moveTo(primero.x, primero.y);
    
    for (let i = 1; i < puntos.length; i++) {
        const punto = convertirCoordenadas(puntos[i].x, puntos[i].y);
        ctx.lineTo(punto.x, punto.y);
    }
    
    ctx.stroke();
}

// Dibujar punto actual
function dibujarPuntoActual() {
    const y = Math.cos(desplazamiento);
    const punto = convertirCoordenadas(desplazamiento, y);
    
    ctx.beginPath();
    ctx.arc(punto.x, punto.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
}

// Actualizar información
function actualizarInfo() {
    const y = Math.cos(desplazamiento);
    document.getElementById('valorX').textContent = desplazamiento.toFixed(3);
    document.getElementById('valorY').textContent = y.toFixed(3);
}

// Función principal que actualiza todo
function actualizarGrafico() {
    // Avanzar el desplazamiento (movimiento fluido)
    desplazamiento += 0.05;
    
    // Si pasa de 4π, reiniciar
    if (desplazamiento > xMax) {
        desplazamiento = 0;
    }
    
    // Recalcular puntos
    const puntos = calcularPuntos();
    
    // Dibujar todo
    dibujarEjes();
    dibujarCurva(puntos);
    dibujarPuntoActual();
    actualizarInfo();
}

// Iniciar animación (60 FPS para movimiento fluido)
setInterval(actualizarGrafico, 1000 / 60);