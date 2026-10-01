\connect catalogomotos

/* ============================================================
   RESTRICCIONES CHECK
   ============================================================ */

ALTER TABLE administrador
    ADD CONSTRAINT ck_administrador_usuario_max15
    CHECK (char_length(usuario) <= 15);

ALTER TABLE administrador
    ADD CONSTRAINT ck_administrador_contrasena_max60
    CHECK (char_length(contrasena) <= 60);

ALTER TABLE moto
    ADD CONSTRAINT ck_moto_marca_power_motorcycle
    CHECK (marca = 'Power Motorcycle');

ALTER TABLE moto
    ADD CONSTRAINT ck_moto_categoria_valida
    CHECK (categoria IN ('Automaticas', 'Aventura', 'Deportiva', 'Scoter', 'utilitarias'));

ALTER TABLE moto
    ADD CONSTRAINT ck_moto_cilindrada_no_negativa
    CHECK (cilindrada >= 0);

ALTER TABLE moto
    ADD CONSTRAINT ck_moto_precio_no_negativo
    CHECK (precio >= 0);

ALTER TABLE moto
    ADD CONSTRAINT ck_moto_stock_no_negativo
    CHECK (stock >= 0);

/* ============================================================
   RESTRICCIONES DEFAULT
   ============================================================ */

CREATE SEQUENCE administrador_identificador_seq START WITH 1;
CREATE SEQUENCE moto_identificador_seq START WITH 1;

ALTER TABLE administrador
    ALTER COLUMN identificador SET DEFAULT nextval('administrador_identificador_seq');

ALTER TABLE moto
    ALTER COLUMN identificador SET DEFAULT nextval('moto_identificador_seq');

ALTER TABLE moto
    ALTER COLUMN marca SET DEFAULT 'Power Motorcycle';

ALTER TABLE moto
    ALTER COLUMN stock SET DEFAULT 0;

/* ============================================================
   CLAVES PRIMARIAS
   ============================================================ */

ALTER TABLE administrador
    ADD CONSTRAINT pk_administrador PRIMARY KEY (identificador);

ALTER TABLE moto
    ADD CONSTRAINT pk_moto PRIMARY KEY (identificador);

/* ============================================================
   CAMPOS OBLIGATORIOS
   ============================================================ */

ALTER TABLE administrador
    ALTER COLUMN usuario SET NOT NULL;

ALTER TABLE administrador
    ALTER COLUMN contrasena SET NOT NULL;

ALTER TABLE moto
    ALTER COLUMN modelo SET NOT NULL;

ALTER TABLE moto
    ALTER COLUMN marca SET NOT NULL;

ALTER TABLE moto
    ALTER COLUMN categoria SET NOT NULL;

ALTER TABLE moto
    ALTER COLUMN cilindrada SET NOT NULL;

ALTER TABLE moto
    ALTER COLUMN precio SET NOT NULL;

ALTER TABLE moto
    ALTER COLUMN imagen_link SET NOT NULL;

ALTER TABLE moto
    ALTER COLUMN stock SET NOT NULL;

ALTER TABLE moto
    ALTER COLUMN descripcion SET NOT NULL;

/* ============================================================
   RESTRICCIÓN UNIQUE
   ============================================================ */

ALTER TABLE administrador
    ADD CONSTRAINT uq_administrador_usuario UNIQUE (usuario);
