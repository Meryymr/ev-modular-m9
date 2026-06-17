# Sistema de gestión de tareas 

Backend desarrollado con Node.js, Express, Sequelize ORM y PostgreSQL, integrado con un Frontend responsivo bajo la arquitectura MVC (Modelo-Vista-Controlador).

## Características del Proyecto
**Autenticación Robusta:** Registro e Inicio de Sesión de usuarios con contraseñas encriptadas de forma asíncrona mediante `bcrypt`.
- **Seguridad y Control de Acceso:** Endpoints y rutas del CRUD totalmente protegidas mediante Tokens de Seguridad `JWT` (JSON Web Tokens).
- **Persistencia Relacional:** Arquitectura relacional administrada vía Sequelize ORM sincronizada automáticamente con PostgreSQL.
- **Validaciones Avanzadas:** Frontend blindado con Bootstrap para el control de estados y manejo de sesiones en `localStorage`.

## Tecnologías Utilizadas
- **Backend:** Node.js, Express, JavaScript (ES6+ Modules)
- **Base de Datos & ORM:** PostgreSQL, Sequelize ORM
- **Seguridad:** JSON Web Tokens (JWT), Bcrypt (Salt factor: 10)
- **Frontend:** HTML5, CSS3, JavaScript Vanilla, Bootstrap 5

### Portafolio personal + Portafolio Backend
Se implementa un portafolio personal, con algunas pestañas como contacto o login, que se linkea directamente con el proyecto principal: Sistema de gestión de tareas
