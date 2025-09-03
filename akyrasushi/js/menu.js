// JavaScript específico para la página de menú

// Función para inicializar animaciones del menú
function initMenuAnimations() {
    // Observador de intersección para animar elementos al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todos los elementos del menú
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
}

// Función para filtrar elementos del menú
function initMenuFiltering() {
    // Crear botones de filtro si no existen
    const menuSection = document.getElementById('menu');
    const container = document.querySelector('.container');
    const sectionTitle = document.querySelector('.section-title');
    
    const filterHTML = `
        <div class="menu-filters">
            <button class="filter-btn active" data-filter="all">Todo</button>
            <button class="filter-btn" data-filter="porciones">Porciones</button>
            <button class="filter-btn" data-filter="handrolls">Hand Rolls</button>
            <button class="filter-btn" data-filter="gyosas">Gyosas</button>
            <button class="filter-btn" data-filter="promos">Promociones</button>
        </div>
    `;
    
    sectionTitle.insertAdjacentHTML('afterend', filterHTML);
    
    // Añadir estilos para los filtros
    const style = document.createElement('style');
    style.textContent = `
        .menu-filters {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 2rem;
        }
        
        .filter-btn {
            padding: 0.5rem 1rem;
            background-color: #f0f0f0;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .filter-btn:hover {
            background-color: #e0e0e0;
        }
        
        .filter-btn.active {
            background-color: var(--primary-color);
            color: white;
        }
        
        .menu-category {
            transition: opacity 0.3s ease;
        }
        
        .menu-category.hidden {
            display: none;
        }
    `;
    document.head.appendChild(style);
    
    // Añadir funcionalidad a los botones de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filtrar categorías
            menuCategories.forEach(category => {
                const categoryTitle = category.querySelector('h3').textContent.toLowerCase();
                
                if (filter === 'all') {
                    category.classList.remove('hidden');
                } else if (filter === 'porciones' && categoryTitle.includes('porciones')) {
                    category.classList.remove('hidden');
                } else if (filter === 'handrolls' && categoryTitle.includes('hand rolls')) {
                    category.classList.remove('hidden');
                } else if (filter === 'gyosas' && categoryTitle.includes('gyosas')) {
                    category.classList.remove('hidden');
                } else if (filter === 'promos' && (categoryTitle.includes('extra') || categoryTitle.includes('promo'))) {
                    category.classList.remove('hidden');
                } else {
                    category.classList.add('hidden');
                }
            });
        });
    });
}

// Función para mejorar la experiencia de pedido por WhatsApp
function enhanceWhatsAppOrdering() {
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            
            // Animación de confirmación
            this.innerHTML = '<i class="fas fa-check"></i> Redirigiendo...';
            this.style.backgroundColor = '#128C7E';
            
            setTimeout(() => {
                window.open(url, '_blank');
                
                // Restaurar el botón después de 2 segundos
                setTimeout(() => {
                    this.innerHTML = '<i class="fab fa-whatsapp"></i> Pedir por WhatsApp';
                    this.style.backgroundColor = '';
                }, 2000);
            }, 500);
        });
    });
}

// Inicializar todas las funcionalidades cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    initMenuAnimations();
    initMenuFiltering();
    enhanceWhatsAppOrdering();
    
    // Añadir funcionalidad de "volver arriba"
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopBtn);
    
    // Estilos para el botón de volver arriba
    const scrollStyle = document.createElement('style');
    scrollStyle.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 98;
            transition: all 0.3s ease;
        }
        
        .scroll-to-top:hover {
            background-color: #c5112f;
            transform: translateY(-3px);
        }
        
        .scroll-to-top.visible {
            display: flex;
        }
    `;
    document.head.appendChild(scrollStyle);
    
    // Mostrar u ocultar el botón según el scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll suave al hacer clic
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});