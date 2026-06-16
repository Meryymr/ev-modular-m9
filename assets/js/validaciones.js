document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', (event) => {
            if (!formLogin.checkVisibility()) {
                event.preventDefault();
                event.stopPropagation
            } else {
                event.preventDefault();
                alert('¡Inicio de sesión exitoso! Redirigiendo...')
                window.location.href = 'dashboard.html'
            }
            formLogin.classList.add('was-validated');
        }, false); 
    }
    //Validación form registro
    const formRegistro = document.getElementById('formRegistro'); 
    if (formRegistro){
        formRegistro.addEventListener('submit', (event) => {
            if (!formRegistro.checkVisibility()){
                event.preventDefault(); 
                event.stopPropagation
            } else {
                event.preventDefault();
                alert('¡Registro exitoso!, ahora puedes iniciar sesión');
                window.location.href = 'index.html'
            }
            formRegistro.classList.add('was-validated')
        }, false);
    }

    //Formulario modal 
const formTarea = document.getElementById('formTarea');
    if (formTarea) {
        formTarea.addEventListener('submit', (event) => {
            if (!formTarea.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                alert('¡Tarea validada con éxito! ');
                
                const modalElement = document.getElementById('modalTarea');
                const modal = bootstrap.Modal.getInstance(modalElement);
                modal.hide();
                formTarea.reset();
                formTarea.classList.remove('was-validated');
            }
            formTarea.classList.add('was-validated');
        }, false);
    }
});