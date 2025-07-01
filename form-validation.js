document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const emailInput = document.getElementById('email');
    const nombreInput = document.getElementById('nombre');
    const mensajeInput = document.getElementById('mensaje');

    // Función para validar email con regex más específico
    function validarEmail(email) {
        // Regex que valida formato email con dominio válido
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // Función para mostrar mensaje de error
    function mostrarError(input, mensaje) {
        // Remover mensaje de error anterior si existe
        const errorAnterior = input.parentNode.querySelector('.error-message');
        if (errorAnterior) {
            errorAnterior.remove();
        }

        // Crear y mostrar nuevo mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = mensaje;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.3rem';
        input.parentNode.appendChild(errorDiv);
        
        // Añadir clase de error al input
        input.classList.add('error');
    }

    // Función para remover mensaje de error
    function removerError(input) {
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('error');
    }

    // Validar nombre en tiempo real (solo al salir del campo)
    nombreInput.addEventListener('blur', function() {
        const nombre = this.value.trim();
        if (nombre === '') {
            mostrarError(this, 'El nombre es obligatorio');
        } else if (nombre.length < 2) {
            mostrarError(this, 'El nombre debe tener al menos 2 caracteres');
        } else {
            removerError(this);
        }
    });

    // Validar mensaje en tiempo real (solo al salir del campo)
    mensajeInput.addEventListener('blur', function() {
        const mensaje = this.value.trim();
        if (mensaje === '') {
            mostrarError(this, 'El mensaje es obligatorio');
        } else if (mensaje.length < 10) {
            mostrarError(this, 'El mensaje debe tener al menos 10 caracteres');
        } else {
            removerError(this);
        }
    });

    // Validar formulario al enviar
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let esValido = true;
        const email = emailInput.value.trim();
        const nombre = nombreInput.value.trim();
        const mensaje = mensajeInput.value.trim();

        // Validar email solo al enviar
        if (email === '') {
            mostrarError(emailInput, 'El email es obligatorio');
            esValido = false;
        } else if (!validarEmail(email)) {
            mostrarError(emailInput, 'Por favor, introduce un email válido (ejemplo: usuario@dominio.com)');
            esValido = false;
        } else {
            removerError(emailInput);
        }

        // Validar nombre
        if (nombre === '') {
            mostrarError(nombreInput, 'El nombre es obligatorio');
            esValido = false;
        } else if (nombre.length < 2) {
            mostrarError(nombreInput, 'El nombre debe tener al menos 2 caracteres');
            esValido = false;
        } else {
            removerError(nombreInput);
        }

        // Validar mensaje
        if (mensaje === '') {
            mostrarError(mensajeInput, 'El mensaje es obligatorio');
            esValido = false;
        } else if (mensaje.length < 10) {
            mostrarError(mensajeInput, 'El mensaje debe tener al menos 10 caracteres');
            esValido = false;
        } else {
            removerError(mensajeInput);
        }

        // Si todo es válido, mostrar mensaje de éxito
        if (esValido) {
            mostrarMensajeExito();
            form.reset();
        }
    });

    // Función para mostrar mensaje de éxito
    function mostrarMensajeExito() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = '¡Mensaje enviado con éxito! Te contactaremos pronto.';
        successDiv.style.color = '#27ae60';
        successDiv.style.backgroundColor = '#d5f4e6';
        successDiv.style.padding = '1rem';
        successDiv.style.borderRadius = '8px';
        successDiv.style.marginTop = '1rem';
        successDiv.style.textAlign = 'center';
        successDiv.style.fontWeight = 'bold';
        
        form.appendChild(successDiv);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}); 