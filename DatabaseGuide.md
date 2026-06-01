# Cookingo API - Configuración de Base de Datos

Este documento explica cómo configurar la base de datos local para correr la API de Cookingo.

Cookingo es una aplicación web de aprendizaje tipo Duolingo para aprender a cocinar platillos saludables. El backend está desarrollado con Spring Boot, usa MySQL como base de datos y se conecta con una UI desarrollada en React + Tailwind.

---

## 1. Requisitos previos

Antes de iniciar, asegúrate de tener instalado:

- Java JDK
- IntelliJ IDEA
- MySQL Server
- MySQL Workbench
- Maven
- Node.js y npm para el frontend

---

## 2. Crear la base de datos

Abrir MySQL Workbench y ejecutar:

```sql
CREATE DATABASE `cookingo-api-db`;
```

Luego seleccionar la base de datos:

```sql
USE `cookingo-api-db`;
```

---

## 3. Crear usuario de MySQL

Ejecutar:

```sql
CREATE USER 'cookingouser'@'localhost' IDENTIFIED BY 'cookingopsw';
```

Dar permisos al usuario:

```sql
GRANT ALL PRIVILEGES ON `cookingo-api-db`.* TO 'cookingouser'@'localhost';
FLUSH PRIVILEGES;
```

---

## 4. Configurar `application.properties`

En el proyecto de Spring Boot, revisar el archivo:

```txt
src/main/resources/application.properties
```

Debe tener una configuración similar a esta:

```properties
spring.application.name=cookingo-api

server.servlet.context-path=/cookingo

spring.datasource.url=jdbc:mysql://localhost:3308/cookingo-api-db
spring.datasource.username=cookingouser
spring.datasource.password=cookingopsw
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

Importante: si tu MySQL corre en el puerto normal, cambia:

```properties
spring.datasource.url=jdbc:mysql://localhost:3308/cookingo-api-db
```

por:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cookingo-api-db
```

---

## 5. Correr la API por primera vez

Ejecuta el proyecto de Spring Boot desde IntelliJ.

Como el proyecto usa:

```properties
spring.jpa.hibernate.ddl-auto=update
```

Hibernate creará las tablas automáticamente según las entidades del proyecto.

Después de correr la API, revisa en MySQL Workbench:

```sql
USE `cookingo-api-db`;
SHOW TABLES;
```

Deberían aparecer tablas parecidas a estas:

```txt
category
ingredients
levels
recipes
recipe_ingredient
recipe_steps
users_entity
```

---

## 6. Insertar categorías base

Ejecuta:

```sql
INSERT INTO category (name) VALUES
('Desayuno'),
('Comida'),
('Cena');
```

Verifica los datos:

```sql
SELECT * FROM category;
```

Normalmente deberían quedar así:

```txt
id | name
1  | Desayuno
2  | Comida
3  | Cena
```

---

## 7. Insertar niveles base

Primero revisa la estructura de la tabla:

```sql
DESCRIBE levels;
```

Si tu tabla `levels` tiene una columna llamada `progress`, usa:

```sql
INSERT INTO levels (progress) VALUES
(1),
(2),
(3),
(4);
```

Si tu tabla `levels` tiene una columna llamada `name`, usa:

```sql
INSERT INTO levels (name) VALUES
('Nivel 1'),
('Nivel 2'),
('Nivel 3'),
('Nivel 4');
```

Después verifica los IDs reales:

```sql
SELECT * FROM levels;
```

Normalmente deberían quedar así:

```txt
id | progress
1  | 1
2  | 2
3  | 3
4  | 4
```

O así, si usas `name`:

```txt
id | name
1  | Nivel 1
2  | Nivel 2
3  | Nivel 3
4  | Nivel 4
```

---

## 8. Insertar ingredientes base

Ejecuta:

```sql
INSERT INTO ingredients (name, calories, protein, price) VALUES
('Copos de avena', 150, 5, 35),
('Leche vegetal', 80, 2, 30),
('Crema de cacahuate', 180, 7, 70),
('Semillas de lino', 55, 2, 30),
('Canela', 5, 0, 40),
('Miel', 60, 0, 70),
('Plátano', 105, 1, 8),
('Espinaca', 23, 3, 18),
('Yogur griego', 120, 10, 25),
('Atún en agua', 130, 28, 22),
('Lechuga', 15, 1, 12),
('Tomate', 22, 1, 10),
('Aguacate', 160, 2, 20),
('Pechuga de pollo', 165, 31, 45),
('Arroz integral', 216, 5, 20),
('Carne molida magra', 180, 24, 55),
('Pepino', 16, 1, 10),
('Limón', 17, 0, 6),
('Aceite de oliva', 119, 0, 90),
('Queso bajo en grasa', 80, 7, 35);
```

Verifica los ingredientes:

```sql
SELECT * FROM ingredients;
```

---

## 9. Verificar IDs importantes

Antes de crear recetas, revisa los IDs reales:

```sql
SELECT * FROM category;
SELECT * FROM levels;
SELECT * FROM ingredients;
```

La aplicación normalmente asume:

```txt
categoryId 1 = Desayuno
categoryId 2 = Comida
categoryId 3 = Cena

levelId 1 = Nivel 1
levelId 2 = Nivel 2
levelId 3 = Nivel 3
levelId 4 = Nivel 4
```

Pero si ya tenías datos insertados antes, los IDs pueden ser diferentes.

---

## 10. Probar endpoints principales en Postman

Con la API corriendo, probar:

```http
GET http://localhost:8080/cookingo/recipes
```

```http
GET http://localhost:8080/cookingo/ingredients
```

Si ambos responden correctamente, la base de datos ya está configurada.

---

## 11. Crear una receta de prueba en Postman

Endpoint:

```http
POST http://localhost:8080/cookingo/recipes
```

Header:

```http
Content-Type: application/json
```

Body:

```json
{
  "name": "Avena de noche con frutas",
  "levelId": 1,
  "categoryId": 1,
  "imageUrl": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=1200&auto=format&fit=crop",
  "totalCalories": 350,
  "totalProteins": 14,
  "ingredients": [
    {
      "ingredientId": 1,
      "amount": "1/2 taza (45 g)"
    },
    {
      "ingredientId": 2,
      "amount": "1/2 taza (120 ml)"
    },
    {
      "ingredientId": 3,
      "amount": "2 cdas. (30 g)"
    },
    {
      "ingredientId": 6,
      "amount": "1 cdita"
    }
  ],
  "ingredientPreparation": [
    "Medir los copos de avena.",
    "Medir la leche vegetal fría.",
    "Preparar la crema de cacahuate y la miel."
  ],
  "cookingPreparation": [
    "Añade los copos de avena al frasco.",
    "Vierte la leche vegetal sobre la avena.",
    "Agrega la crema de cacahuate y la miel.",
    "Mezcla bien todos los ingredientes.",
    "Cierra el frasco y refrigera mínimo 4 horas."
  ]
}
```

Si todo está correcto, la API debe responder con la receta creada y un `id`.

---

## 12. Probar CRUD de recetas

### Obtener todas las recetas

```http
GET http://localhost:8080/cookingo/recipes
```

### Obtener una receta por ID

```http
GET http://localhost:8080/cookingo/recipes/{id}
```

Ejemplo:

```http
GET http://localhost:8080/cookingo/recipes/1
```

### Editar una receta

```http
PUT http://localhost:8080/cookingo/recipes/{id}
```

Ejemplo:

```http
PUT http://localhost:8080/cookingo/recipes/1
```

Body:

```json
{
  "name": "Avena de noche editada",
  "levelId": 2,
  "categoryId": 1,
  "imageUrl": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=1200&auto=format&fit=crop",
  "totalCalories": 390,
  "totalProteins": 18,
  "ingredients": [
    {
      "ingredientId": 1,
      "amount": "3/4 taza (60 g)"
    },
    {
      "ingredientId": 2,
      "amount": "1 taza (240 ml)"
    },
    {
      "ingredientId": 6,
      "amount": "2 cditas"
    }
  ],
  "ingredientPreparation": [
    "Medir los copos de avena.",
    "Medir la leche vegetal.",
    "Preparar la miel."
  ],
  "cookingPreparation": [
    "Añade la avena al frasco.",
    "Agrega la leche vegetal.",
    "Añade miel y mezcla bien.",
    "Refrigera durante toda la noche."
  ]
}
```

### Eliminar una receta

```http
DELETE http://localhost:8080/cookingo/recipes/{id}
```

Ejemplo:

```http
DELETE http://localhost:8080/cookingo/recipes/1
```

---

## 13. Correr el frontend

En la carpeta del frontend:

```bash
npm install
npm run dev
```

La UI debe conectarse a la API en:

```txt
http://localhost:8080/cookingo
```

Si la API corre en otro puerto, actualizar los servicios del frontend.

Por ejemplo:

```js
const BASE_URL = "http://localhost:8080/cookingo/recipes";
```

---

## 14. Unidades usadas

En la aplicación se manejan estas unidades:

```txt
Calorías → kcal
Proteínas → gramos (g)
```

Ejemplo:

```txt
350 kcal
14 g de proteína
```

---

## 15. Problemas comunes

### Error de conexión a MySQL

Revisar:

```properties
spring.datasource.url
spring.datasource.username
spring.datasource.password
```

También revisar si MySQL corre en puerto `3306` o `3308`.

---

### Error: Categoría no encontrada

Revisar:

```sql
SELECT * FROM category;
```

El `categoryId` enviado debe existir.

---

### Error: Nivel no encontrado

Revisar:

```sql
SELECT * FROM levels;
```

El `levelId` enviado debe existir.

---

### Error: Ingrediente no encontrado

Revisar:

```sql
SELECT * FROM ingredients;
```

El `ingredientId` enviado debe existir.

---

### Error de CORS

Revisar la configuración de CORS en Spring Boot. Debe permitir peticiones desde el puerto donde corre React, por ejemplo:

```txt
http://localhost:5173
```

---

## 16. Notas importantes

- No crear recetas con ingredientes que no existan en la tabla `ingredients`.
- Primero se deben insertar categorías, niveles e ingredientes.
- Las recetas usan `categoryId`, `levelId` e `ingredientId` para relacionarse con otras tablas.
- Las calorías se manejan en `kcal`.
- Las proteínas se manejan en gramos `g`.
