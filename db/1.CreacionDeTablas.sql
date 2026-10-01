-- PostgreSQL / psql
-- Ejecutar este archivo con el cliente psql.

-- Crea la base únicamente si todavía no existe.
SELECT 'CREATE DATABASE catalogomotos'


-- Cambia la conexión a la base recién creada.
\connect catalogomotos

-- Creación de tablas sin CHECK, DEFAULT, NOT NULL ni claves.
CREATE TABLE IF NOT EXISTS administrador (
    identificador INTEGER,
    usuario VARCHAR(15),
    contrasena VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS moto (
    identificador INTEGER,
    modelo VARCHAR(50),
    marca VARCHAR(100),
    categoria VARCHAR(20),
    cilindrada INTEGER,
    precio NUMERIC(10, 2),
    imagen_link VARCHAR(255),
    stock INTEGER,
    descripcion VARCHAR(500)
);
