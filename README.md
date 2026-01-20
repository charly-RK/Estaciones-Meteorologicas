# 🌦️ Sistema de Gestión de Estaciones Meteorológicas

Este proyecto es una aplicación web completa para la gestión, monitoreo y administración de estaciones meteorológicas. Permite visualizar datos en tiempo real, gestionar usuarios y controlar el acceso a las estaciones.

## 🚀 Tecnologías Utilizadas

El proyecto está construido utilizando una arquitectura moderna de separación entre Frontend y Backend.

### Frontend (Cliente)
- **Framework**: Angular 14
- **Diseño**: Bootstrap 5
- **Mapas**: Proj4, UTM-LatLng (Visualización de coordenadas)
- **Notificaciones**: SweetAlert2, Ngx-Toastr
- **Seguridad**: JWT Decode

### Backend (Servidor)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT (JSON Web Tokens) & BcryptJS
- **ORM/Driver**: `pg` (node-postgres)
- **Características**:
  - Gestión de Dataloggers
  - Exportación a CSV
  - Control de Visitantes y Accesos

## 📂 Estructura del Proyecto

```
Estaciones-Meteorologicas/
├── Frontend/           # Código fuente de la aplicación Angular
│   ├── src/            # Componentes, servicios y vistas
│   └── package.json    # Dependencias del frontend
│
└── backend/            # API RESTful en Node.js
    ├── config/         # Configuración de base de datos
    ├── controllers/    # Lógica de negocio
    ├── models/         # Modelos de datos
    ├── routes/         # Definición de endpoints
    └── app.js          # Punto de entrada del servidor
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- PostgreSQL
- Angular CLI (`npm install -g @angular/cli`)

### 1. Configuración del Backend

1. Navega al directorio del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   - Crea un archivo `.env` en la carpeta `backend` con la configuración de tu base de datos PostgreSQL y puerto.
4. Inicia el servidor:
   ```bash
   npm start
   ```

### 2. Configuración del Frontend

1. Navega al directorio del frontend:
   ```bash
   cd Frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```
4. Abre tu navegador en `http://localhost:4200`.

## 🔌 API Endpoints Principales

El backend expone las siguientes rutas principales (prefijo `/api`):

- **/users**: Gestión de usuarios.
- **/auth**: Autenticación y login.
- **/estaciones**: CRUD de estaciones meteorológicas.
- **/visitantes**: Control de visitantes.
- **/datalogger**: Recepción y gestión de datos de sensores.
- **/admin**: Funciones administrativas avanzadas.

## 📱 Funcionalidades Clave

- **Dashboard Interactivo**: Visualización de estado de estaciones.
- **Geolocalización**: Conversión y visualización de coordenadas UTM.
- **Seguridad**: Roles de usuario y protección de rutas.
- **Reportes**: Exportación de datos históricos.

## 👨‍💻 Autor
**Risk Keep**
