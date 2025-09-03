// JavaScript para la página "Sobre Nosotros"

// Función para el formulario de suscripción
function initSubscriptionForm() {
    const subscriptionForm = document.getElementById('subscribeForm');
    
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const name = document.getElementById('name').value;
            const messageDiv = document.getElementById('subscriptionMessage');
            
            // Validación simple de email
            if (!email || !email.includes('@')) {
                showMessage('Por favor, introduce un email válido', 'error', messageDiv);
                return;
            }
            
            try {
                // Simular envío a un servidor (en un caso real, aquí iría la URL de tu API)
                const response = await simulateSubscriptionRequest(email, name);
                
                if (response.success) {
                    showMessage('¡Gracias por suscribirte! Te hemos enviado un email de confirmación.', 'success', messageDiv);
                    subscriptionForm.reset();
                } else {
                    showMessage('Error al procesar la suscripción. Intenta nuevamente.', 'error', messageDiv);
                }
                
            } catch (error) {
                showMessage('Error de conexión. Intenta nuevamente más tarde.', 'error', messageDiv);
            }
        });
    }
}

// Función para simular una petición de suscripción (en producción, reemplazar con una petición real)
async function simulateSubscriptionRequest(email, name) {
    // Simular un retraso de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular una respuesta exitosa (90% de éxito)
    const success = Math.random() > 0.1;
    
    return {
        success: success,
        message: success ? 'Suscripción exitosa' : 'Error en el servidor'
    };
}

// Función para mostrar mensajes al usuario
function showMessage(text, type, messageDiv) {
    messageDiv.textContent = text;
    messageDiv.className = type;
    messageDiv.style.display = 'block';
    
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Función para animar los valores al hacer scroll
function animateValues() {
    const valueCards = document.querySelectorAll('.value-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    valueCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Función para inicializar tooltips en los iconos de valores
function initValueTooltips() {
    const valueIcons = document.querySelectorAll('.value-card i');
    
    valueIcons.forEach(icon => {
        const title = icon.parentElement.querySelector('h4').textContent;
        icon.setAttribute('title', title);
    });
}

// Inicializar todas las funcionalidades cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    initSubscriptionForm();
    animateValues();
    initValueTooltips();
    
    // Efecto de escritura para el título
    const title = document.querySelector('.about-text h3');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50);
    }
});