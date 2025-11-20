# Evaluación Portafolio – API Biblioteca de Libros con JWT

Esta aplicación forma parte de la Evaluación de Portafolio.  
Es una API REST construida con **Node.js** y **Express** que permite:

- Registrar usuarios (`/register`)
- Iniciar sesión con **JWT** (`/login`)
- Listar libros disponibles (`/libros`)
- Comprar libros solo si el usuario está autenticado (`/libros/:id/comprar`)

## Tecnologías utilizadas

- Node.js
- Express
- JSON Web Token (jsonwebtoken)

## Cómo ejecutar el proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Floracuatica/evaluacion-portafolio-libros.git
   cd evaluacion-portafolio-libros

2. Instalar dependencias:

npm install

3. Iniciar el servidor:

npm start

4. El servidor quedará escuchando en http://localhost:3000.


Rutas principales
Registro de usuario

POST /register

Body JSON:

json
{
  "username": "rommy",
  "password": "1234"
}
Login de usuario (JWT)
POST /login

Body JSON:

json
{
  "username": "rommy",
  "password": "1234"
}
La respuesta incluye un token JWT.

Listar libros
GET /libros

Comprar libro
POST /libros/:id/comprar

Headers:
Authorization: Bearer <token>

Body JSON:

json
{
  "cantidad": 1
}
Si hay stock suficiente, descuenta del inventario.

Si no hay stock, devuelve un mensaje de error.
