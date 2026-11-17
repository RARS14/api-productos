# API de Productos

Aplicación web para la gestión de productos con autenticación JWT. Permite registrar usuarios, iniciar y cerrar sesión, y administrar productos (crear, consultar, actualizar y eliminar). Incluye una página de login en HTML.

## Tecnologías

Node.js, Express, MongoDB Atlas con Mongoose, JWT, bcryptjs, Jest y Supertest. Despliegue en Vercel con CI/CD en GitHub Actions.

## Requisitos

- Node.js 20 o superior
- Una cuenta de MongoDB Atlas con un clúster y un usuario de base de datos

## Instalación

```bash
git clone https://github.com/RARS14/api-productos.git
cd api-productos
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz con:

```
MONGO_URI=cadena_de_conexion_de_atlas
JWT_SECRET=clave_secreta
PORT=3000
```

## Ejecutar la aplicación

```bash
node server.js
```

Abrir `http://localhost:3000` para ver la página de login.

## Pruebas

```bash
npm test
```

## Rutas principales

| Método | Ruta | Descripción |
|---|---|---|
| POST | /api/auth/register | Registrar usuario |
| POST | /api/auth/login | Iniciar sesión (devuelve el token) |
| GET | /api/productos | Listar productos (requiere token) |
| POST | /api/productos | Crear producto (requiere token) |
| PUT | /api/productos/:id | Actualizar producto (requiere token) |
| DELETE | /api/productos/:id | Eliminar producto (requiere token) |

El token se envía en el encabezado `Authorization: Bearer <token>`.

## Despliegue

La aplicación está desplegada en Vercel: https://api-productos-delta.vercel.app

El pipeline de CI/CD está en `.github/workflows/deploy.yml`: con cada cambio en `main` ejecuta las pruebas y, si pasan, despliega en Vercel.