// Cargar proyectos desde JSON
async function cargarProyectos() {
    try {
        const response = await fetch('proyectos.json');
        const data = await response.json();
        
        console.log('Proyectos cargados:', data);
        
        if (data.trabajos.length === 0 && data.ejercicios.length === 0) {
            document.getElementById('projectsContainer').innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding:3rem; background:#1f0c10; border-radius:1rem;">
                    <i class="fas fa-folder-open" style="font-size:3rem; color:#ff6b6b;"></i>
                    <p style="margin-top:1rem;"><strong>No hay proyectos aún</strong></p>
                    <p>Edita el archivo <strong>proyectos.json</strong> para agregar tus trabajos</p>
                    <p style="font-family:monospace; background:#2a1014; padding:0.5rem; border-radius:8px; margin-top:0.5rem;">
                        📝 Ejemplo de cómo agregar un proyecto
                    </p>
                </div>
            `;
            return;
        }
        
        mostrarProyectos(data);
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('projectsContainer').innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:2rem; background:#1f0c10; border-radius:1rem;">
                <i class="fas fa-exclamation-triangle" style="font-size:2rem; color:#ff6b6b;"></i>
                <p style="margin-top:1rem;"><strong>Error al cargar proyectos.json</strong></p>
                <p>Asegúrate de que el archivo existe y tiene el formato correcto</p>
                <p style="font-size:0.8rem; margin-top:0.5rem;">💡 Revisa la consola (F12) para más detalles</p>
            </div>
        `;
    }
}

let todosLosProyectos = [];

function mostrarProyectos(data) {
    todosLosProyectos = [
        ...data.trabajos.map(p => ({ ...p, tipoLabel: '📋 Tarea', tipoFiltro: 'trabajos' })),
        ...data.ejercicios.map(p => ({ ...p, tipoLabel: '💪 Ejercicio', tipoFiltro: 'ejercicios' }))
    ];
    
    aplicarFiltro();
}

function aplicarFiltro() {
    const filtroActivo = document.querySelector('.cat-btn.active')?.getAttribute('data-filter') || 'all';
    
    let proyectosFiltrados = todosLosProyectos;
    if (filtroActivo !== 'all') {
        proyectosFiltrados = todosLosProyectos.filter(p => p.tipoFiltro === filtroActivo);
    }
    
    if (proyectosFiltrados.length === 0) {
        document.getElementById('projectsContainer').innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:3rem;">
                <i class="fas fa-folder-open"></i>
                <p>No hay proyectos en esta categoría</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    proyectosFiltrados.forEach(proyecto => {
        html += `
            <div class="project-card" data-ruta="${proyecto.ruta}" data-nombre="${escapeHtml(proyecto.nombre)}" data-tipo="${proyecto.tipoLabel}">
                <div class="card-preview">
                    <i class="fab fa-html5"></i>
                </div>
                <div class="card-info">
                    <h3>${escapeHtml(proyecto.nombre)}</h3>
                    <div class="card-path">📄 ${proyecto.archivo}</div>
                    <div class="card-tags">
                        <span class="tag"><i class="fab fa-html5"></i> HTML5</span>
                        <span class="tag">${proyecto.tipoLabel}</span>
                        ${proyecto.tecnologias ? proyecto.tecnologias.map(t => `<span class="tag">${t}</span>`).join('') : ''}
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn-view ver-proyecto">
                        Ver contenido <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    document.getElementById('projectsContainer').innerHTML = html;
    
    document.querySelectorAll('.ver-proyecto').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.project-card');
            abrirProyecto(card);
        });
    });
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => abrirProyecto(card));
    });
}

function abrirProyecto(card) {
    const ruta = card.getAttribute('data-ruta');
    const nombre = card.getAttribute('data-nombre');
    const tipo = card.getAttribute('data-tipo');
    
    const modal = document.getElementById('previewModal');
    const iframe = document.getElementById('previewFrame');
    
    document.getElementById('modalTitle').textContent = nombre;
    document.getElementById('modalCategory').textContent = tipo;
    
    iframe.src = ruta;
    modal.style.display = 'flex';
    
    document.getElementById('openNewTab').onclick = () => window.open(ruta, '_blank');
    document.getElementById('refreshPreview').onclick = () => {
        iframe.src = iframe.src;
    };
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filtro = this.getAttribute('data-filter');
        let label = filtro === 'all' ? 'Mostrando: todos' : (filtro === 'trabajos' ? 'Mostrando: tareas' : 'Mostrando: ejercicios');
        document.getElementById('activeFilterLabel').textContent = label;
        
        aplicarFiltro();
    });
});

document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('previewModal').style.display = 'none';
    document.getElementById('previewFrame').src = '';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('previewModal');
    if (e.target === modal) {
        modal.style.display = 'none';
        document.getElementById('previewFrame').src = '';
    }
});

cargarProyectos();