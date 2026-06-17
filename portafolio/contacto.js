document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formContacto");

  if (formulario) {
    formulario.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();

        const inputNombre = document.getElementById("nombre");
        const inputEmail = document.getElementById("email");
        const errorNombre = document.getElementById("errorNombre");
        const errorEmail = document.getElementById("errorEmail");

        inputNombre.setCustomValidity("");
        inputEmail.setCustomValidity("");

        // Expresiones regulares para validar
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)+$/; // Al menos dos palabras
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Estructura estándar de email

        let formularioValido = true;

        if (!regexNombre.test(inputNombre.value.trim())) {
          inputNombre.setCustomValidity("Invalido");
          errorNombre.textContent =
            "Por favor, ingresa tu nombre y apellido (solo letras).";
          formularioValido = false;
        } else {
          inputNombre.setCustomValidity("");
        }

        if (!regexEmail.test(inputEmail.value.trim())) {
          inputEmail.setCustomValidity("Invalido");
          errorEmail.textContent =
            "Por favor, ingresa una dirección de correo válida (ejemplo@dominio.com).";
          formularioValido = false;
        } else {
          inputEmail.setCustomValidity("");
        }

        if (formularioValido && this.checkValidity()) {
          alert(
            "¡Muchas gracias por tu mensaje!, pronto me pondré en contacto contigo",
          );

          this.reset();
          this.classList.remove("was-validated");
        } else {
          event.stopPropagation();
          this.classList.add("was-validated");
        }
      },
      false,
    );
  }
});
