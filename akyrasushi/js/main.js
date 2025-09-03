// Variables para controlar el scroll
let lastScrollTop = 0;
const header = document.getElementById('main-header');
const scrollThreshold = 50; // Umbral de scroll para activar la animación

// Función para manejar el evento de scroll
function handleScroll() {
    // Solo aplicar en dispositivos móviles (ancho menor a 768px)
    if (window.innerWidth <= 768) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scroll hacia abajo - ocultar header
            header.classList.add('hide');
        } else {
            // Scroll hacia arriba - mostrar header
            header.classList.remove('hide');
        }
        
        lastScrollTop = scrollTop;
    } else {
        // En desktop, asegurarse de que el header esté visible
        header.classList.remove('hide');
    }
}

// Agregar evento de scroll con throttling para mejor rendimiento
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Asegurarse de que el header esté visible al cargar la página
window.addEventListener('load', function() {
    header.classList.remove('hide');
});