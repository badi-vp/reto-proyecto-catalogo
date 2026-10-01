\connect catalogomotos

INSERT INTO administrador (identificador, usuario, contrasena)
VALUES (
    1,
    'sabino007',
    '$2b$08$Wcp08HI/i0fGRnn3Xsj7KeRKmZMM3diHq8UhRjn9GC5NnInNrTXrK'
)
ON CONFLICT (identificador) DO UPDATE
SET usuario = EXCLUDED.usuario,
    contrasena = EXCLUDED.contrasena;

INSERT INTO moto
    (identificador, modelo, marca, categoria, cilindrada, precio, imagen_link, stock, descripcion)
VALUES
    (1, 'BROZZ-250', 'Power Motorcycle', 'Aventura', 250, 21200.00,
     'https://www.powermotorcycle.com.bo/assets/img/motos/brozz-250.webp', 5,
     'Motocicleta de aventura de 250 cc.'),
    (2, 'FOX RS-250', 'Power Motorcycle', 'Deportiva', 250, 25100.00,
     'https://www.powermotorcycle.com.bo/assets/img/motos/fox-rs-250-1.webp', 4,
     'Motocicleta deportiva de 250 cc.'),
    (3, 'NXR-250', 'Power Motorcycle', 'Aventura', 250, 24800.00,
     'https://www.powermotorcycle.com.bo/assets/img/motos/nxr-250.webp', 3,
     'Motocicleta de aventura de 250 cc.'),
    (4, 'LIBERTY-200', 'Power Motorcycle', 'Deportiva', 200, 17100.00,
     'https://www.powermotorcycle.com.bo/assets/img/motos/liberty-200.webp', 6,
     'Motocicleta deportiva de 200 cc.'),
    (5, 'BIT-150', 'Power Motorcycle', 'Automaticas', 150, 17500.00,
     'https://www.powermotorcycle.com.bo/assets/img/motos/bit-150.webp', 8,
     'Motocicleta automática de 150 cc.'),
    (6, 'CGL-150', 'Power Motorcycle', 'utilitarias', 150, 14800.00,
     'https://www.powermotorcycle.com.bo/assets/img/motos/cgl-150.webp', 7,
     'Motocicleta utilitaria de 150 cc.'),
    (7, 'CGL-150E', 'Power Motorcycle', 'utilitarias', 150, 12900.00,
     'https://www.powermotorcycle.com.bo/assets/img/motos/cgl-150-e-1.webp', 5,
     'Motocicleta utilitaria de 150 cc.'),
    (8, 'CB1-150', 'Power Motorcycle', 'utilitarias', 150, 14700.00,
     'https://www.powermotorcycle.com.bo/assets/img/motos/cb1-150.webp', 4,
     'Motocicleta utilitaria de 150 cc.'),
    (9, 'BLITZ-135', 'Power Motorcycle', 'Scoter', 135, 12900.00,
     'https://www.powermotorcycle.com.bo/assets/img/motos/blitz-135.webp', 9,
     'Motocicleta tipo scooter de 135 cc.'),
    (10, 'BIS-135', 'Power Motorcycle', 'Scoter', 135, 12900.00,
     'https://www.powermotorcycle.com.bo/assets/img/motos/bis-135.webp', 6,
     'Motocicleta tipo scooter de 135 cc.')
ON CONFLICT (identificador) DO UPDATE
SET modelo = EXCLUDED.modelo,
    marca = EXCLUDED.marca,
    categoria = EXCLUDED.categoria,
    cilindrada = EXCLUDED.cilindrada,
    precio = EXCLUDED.precio,
    imagen_link = EXCLUDED.imagen_link,
    stock = EXCLUDED.stock,
    descripcion = EXCLUDED.descripcion;

SELECT setval(
    'administrador_identificador_seq',
    COALESCE((SELECT MAX(identificador) FROM administrador), 1)
);

SELECT setval(
    'moto_identificador_seq',
    COALESCE((SELECT MAX(identificador) FROM moto), 1)
);
