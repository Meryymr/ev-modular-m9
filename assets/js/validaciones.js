document.addEventListener('DOMContentLoaded', () => {
    
//Formulario de Login
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', async (event) => {
            if (!formLogin.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                formLogin.classList.add('was-validated');
            } else {
                event.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                try {
                    const respuesta = await fetch('http://localhost:3000/api/usuarios/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password })
                    });

                    const datos = await respuesta.json();

                    if (respuesta.ok) {
                        alert(`¡Bienvenido/a ${datos.usuario.nombre}!`);
        
                        localStorage.setItem('usuarioRol', datos.usuario.rol);
                        window.location.href = 'dashboard.html';
                    } else {
                        alert(`Error: ${datos.error}`);
                    }
                } catch (error) {
                    alert('Error al conectar con el servidor.');
                }
            }
        }, false);
    }

    //Formulario de Registro
    const formRegistro = document.getElementById('formRegistro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', async (event) => {
            if (!formRegistro.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                formRegistro.classList.add('was-validated');
            } else {
                event.preventDefault();
                const nombre = document.getElementById('nombre').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const rol = document.getElementById('rol').value;

                try {
                    const respuesta = await fetch('http://localhost:3000/api/usuarios/registro', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nombre, email, password, rol })
                    });

                    const datos = await respuesta.json();

                    if (respuesta.ok) {
                        alert('🎉 ¡Registro exitoso! Ahora puedes iniciar sesión.');
                        window.location.href = 'index.html';
                    } else {
                        alert(`Error: ${datos.error}`);
                    }
                } catch (error) {
                    alert('Error al conectar con el servidor.');
                }
            }
        }, false);
    }

    //Formulario modal 
const formTarea = document.getElementById('formTarea');
    if (formTarea) {
        formTarea.addEventListener('submit', async (event) => {
            if (!formTarea.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                formTarea.classList.add('was-validated');
            } else {
                event.preventDefault(); 

                const titulo = document.getElementById('tituloTarea').value;
                const descripcion = document.getElementById('descripcionTarea').value;

                try {
                    // Enviamos los datos al servidor local usando Fetch
                    const respuesta = await fetch('http://localhost:3000/api/tareas', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ titulo, descripcion })
                    });

                    const datos = await respuesta.json();

                    if (respuesta.ok) {
                        alert(`Éxito!: ${datos.mensaje}`);
                        
                        // Cerramos la ventana modal
                        const modalElement = document.getElementById('modalTarea');
                        const modal = bootstrap.Modal.getInstance(modalElement);
                        modal.hide();
                        
                        // Limpiamos el formulario para la próxima tarea
                        formTarea.reset();
                        formTarea.classList.remove('was-validated');
                    } else {
                        alert(`Error en el servidor: ${datos.error}`);
                    }

                } catch (error) {
                    console.error('Error al conectar con la API:', error);
                    alert('No se pudo conectar con el servidor');
                }
            }
        }, false);
    }
});