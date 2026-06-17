document.addEventListener("DOMContentLoaded", () => {
  //Formulario de Login
  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener(
      "submit",
      async (event) => {
        if (!formLogin.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          formLogin.classList.add("was-validated");
        } else {
          event.preventDefault();
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;

          try {
            const respuesta = await fetch(
              "http://localhost:3000/api/usuarios/login",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
              },
            );

            const datos = await respuesta.json();

            if (respuesta.ok) {
              alert(`¡Bienvenido/a ${datos.usuario.nombre}!`);

              localStorage.setItem("token", datos.token);
              localStorage.setItem("usuarioRol", datos.usuario.rol);

              window.location.href = "dashboard.html";
            } else {
              alert(`Error: ${datos.error}`);
            }
          } catch (error) {
            alert("Error al conectar con el servidor.");
          }
        }
      },
      false,
    );
  }

  //Formulario de Registro
  const formRegistro = document.getElementById("formRegistro");
  if (formRegistro) {
    formRegistro.addEventListener(
      "submit",
      async (event) => {
        if (!formRegistro.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          formRegistro.classList.add("was-validated");
        } else {
          event.preventDefault();
          const nombre = document.getElementById("nombre").value;
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;
          const rol = document.getElementById("rol").value;

          try {
            const respuesta = await fetch(
              "http://localhost:3000/api/usuarios/registro",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, email, password, rol }),
              },
            );

            const datos = await respuesta.json();

            if (respuesta.ok) {
              alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
              window.location.href = "index.html";
            } else {
              alert(`Error: ${datos.error}`);
            }
          } catch (error) {
            alert("Error al conectar con el servidor.");
          }
        }
      },
      false,
    );
  }

  //Formulario modal
  const formTarea = document.getElementById("formTarea");
  if (formTarea) {
    formTarea.addEventListener(
      "submit",
      async (event) => {
        if (!formTarea.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          formTarea.classList.add("was-validated");
        } else {
          event.preventDefault();

          const titulo = document.getElementById("tituloTarea").value;
          const descripcion = document.getElementById("descripcionTarea").value;

          try {
            const token = localStorage.getItem("token");

            const respuesta = await fetch("http://localhost:3000/api/tareas", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({ titulo, descripcion }),
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
              alert(`Éxito!: ${datos.mensaje}`);

              const modalElement = document.getElementById("modalTarea");
              const modal = bootstrap.Modal.getInstance(modalElement);
             if (document.activeElement) {
    document.activeElement.blur();
  }
              modal.hide();
              formTarea.reset();
              formTarea.classList.remove("was-validated");
            } else {
              alert(`Error en el servidor: ${datos.error}`);
            }
          } catch (error) {
            console.error("Error al conectar con la API:", error);
            alert("No se pudo conectar con el servidor");
          }
        }
      },
      false,
    );
  }
});

//Consumo de API externa 
document.addEventListener('DOMContentLoaded', async () => {
    const contenedorTareas = document.getElementById('contenedorTareas');
    
    if (contenedorTareas) {
        try {
            const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
            const posts = await respuesta.json();
            contenedorTareas.innerHTML = '';

            posts.forEach(post => {
                const tarjetaHtml = `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 shadow-sm border-dark">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h5 class="card-title text-capitalize text-truncate" title="${post.title}">
                                        ${post.title}
                                    </h5>
                                    <p class="card-text text-muted small">
                                        ${post.body.substring(0, 100)}...
                                    </p>
                                </div>
                                <div class="mt-3 d-flex justify-content-between align-items-center">
                                    <span class="badge bg-info text-dark">Tareas simuladas</span>
                                    <small class="text-secondary">ID: #${post.id}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                contenedorTareas.insertAdjacentHTML('beforeend', tarjetaHtml);
            });

        } catch (error) {
            console.error('Error al consumir la API externa:', error);
            contenedorTareas.innerHTML = `
                <div class="alert alert-danger col-12" role="alert">
                    No se pudieron cargar las tareas simuladas de la API externa.
                </div>
            `;
        }
    }
});