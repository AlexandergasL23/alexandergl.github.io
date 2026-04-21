// Configuración del canvas
const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');

// Dimensiones
const width = 600;
const height = 400;

// Número de puntos
const numPuntos = 5;
const radio = 6;

// Arreglo para guardar los puntos (coordenadas)
const puntos = [];

// Crear puntos iniciales con coordenadas aleatorias
for (let i = 0; i < numPuntos; i++) {
    puntos.push({
        x: Math.random() * width,
        y: Math.random() * height,
        color: `hsl(${Math.random() * 360}, 70%, 55%)`
    });
}

// Actualizar contador
document.getElementById('contador').textContent = puntos.length;

// Dibujar todos los puntos
function dibujarPuntos() {
    for (let i = 0; i < puntos.length; i++) {
        ctx.beginPath();
        ctx.arc(puntos[i].x, puntos[i].y, radio, 0, Math.PI * 2);
        ctx.fillStyle = puntos[i].color;
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

// Actualizar coordenadas de los puntos (nueva posición aleatoria)
function actualizarCoordenadas() {
    for (let i = 0; i < puntos.length; i++) {
        puntos[i].x = Math.random() * width;
        puntos[i].y = Math.random() * height;
    }
}

// Limpiar el lienzo y redibujar todo
function redibujar() {
    // Limpiar el lienzo con clearRect
    ctx.clearRect(0, 0, width, height);
    
    // Dibujar los puntos en sus nuevas posiciones
    dibujarPuntos();
}

// Función principal que se ejecuta cada segundo
function actualizarMovimiento() {
    actualizarCoordenadas();  // Actualizar coordenadas
    redibujar();              // Limpiar y redibujar
}

// Actualizar cada segundo
setInterval(actualizarMovimiento, 1000);

// Dibujar por primera vez
redibujar();