--Tabla de usuarios 
CREATE TABLE IF NOT EXISTS "Usuarios" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL, 
    "contrasena"VARCHAR(255) NOT NULL,
    "rol" VARCHAR(50) DEFAULT 'usuario',
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

--Tareas 
CREATE TABLE IF NOT EXISTS "Tareas" (
    "id" SERIAL PRIMARY KEY,
    "titulo" VARCHAR(255) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" VARCHAR(50) DEFAULT 'Pendiente',
    "asignadoA" INTEGER REFERENCES "Usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

--Usuario de prueba 
INSERT INTO "Usuarios" ("nombre", "email", "contrasena", "rol", "createdAt", "updatedAt")
VALUES ('Juan Pérez', 'juan@perez.com', '$2b$10$xyz...', 'usuario', NOW(), NOW());

--Tarea asociada al usuario 
INSERT INTO "Tareas" ("titulo", "descripcion", "estado", "asignadoA", "createdAt", "updatedAt")
VALUES ('Revisar rúbrica', 'Completar los scripts de consultas', 'Pendiente', 1, NOW(), NOW());

--Consultar tarea por usuario específico 
SELECT t."id", t."titulo", t."estado", u."nombre" AS "asignado_a"
FROM "Tareas" t
INNER JOIN "Usuarios" u ON t."asignadoA" = u."id"
WHERE u."id" = 1;

--Actualizar una tarea - cambio estado 
UPDATE "Tareas"
SET "estado" = 'Completado', "updatedAt" = NOW()
WHERE "id" = 1;

--Eliminar registro 
DELETE FROM "Tareas"
WHERE "id" = 1;