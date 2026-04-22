// Configuración
const numBarras = 5;
const alturaMaxima = 250;

// Obtener el contenedor
const grafico = document.getElementById('grafico');
const spanValores = document.getElementById('valores');

// Crear las barras
const barras = [];
const valores = [];

for (let i = 0; i < numBarras; i++) {
    // Crear contenedor de barra
    const barraContainer = document.createElement('div');
    barraContainer.style.display = 'flex';
    barraContainer.style.flexDirection = 'column';
    barraContainer.style.alignItems = 'center';
    barraContainer.style.gap = '10px';
    
    // Crear barra
    const barra = document.createElement('div');
    barra.className = 'barra';
    barra.id = `barra-${i}`;
    
    // Crear etiqueta
    const etiqueta = document.createElement('span');
    etiqueta.textContent = `Barra ${i + 1}`;
    etiqueta.style.fontSize = '12px';
    
    barraContainer.appendChild(barra);
    barraContainer.appendChild(etiqueta);
    grafico.appendChild(barraContainer);
    
    barras.push(barra);
    valores.push(0);
}

// Generar valor aleatorio
function valorAleatorio() {
    return Math.floor(Math.random() * 91) + 10; // 10 a 100
}

// Actualizar gráfico
function actualizarGrafico() {
    // Generar nuevos valores
    for (let i = 0; i < numBarras; i++) {
        valores[i] = valorAleatorio();
    }
    
    // Actualizar alturas
    for (let i = 0; i < numBarras; i++) {
        const altura = (valores[i] / 100) * alturaMaxima;
        barras[i].style.height = `${altura}px`;
    }
    
    // Actualizar texto
    spanValores.textContent = valores.join(', ');
}

// Actualizar cada segundo
setInterval(actualizarGrafico, 1000);

// Primera actualización
actualizarGrafico();