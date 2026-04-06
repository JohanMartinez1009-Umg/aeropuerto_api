# 🛫 Aeropuerto API - Sistema de Gestión SGA

API RESTful para el Sistema de Gestión de Aeropuerto (SGA) desarrollada con Node.js y Oracle Database.

## 🚀 Características

- ✈️ Sistema completo de gestión aeroportuaria
- 🗃️ 40+ tablas del esquema SGA con relaciones FK
- 🔄 Inicialización automática de base de datos
- 📊 Consultas optimizadas con JOINs
- 🛡️ Gestión segura de conexiones Oracle

## 📋 Requisitos Previos

- Node.js 18+
- Oracle Database 12c+ o Oracle XE
- Oracle Instant Client

## ⚙️ Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone <tu-repo>
   cd aeropuerto_api
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   # Editar .env con tus credenciales de Oracle
   ```

4. **Inicializar la base de datos:**
   ```bash
   npm run dev
   # Luego: POST http://localhost:3000/inicializar-sga
   ```

## 🎮 Uso

### Arrancar el servidor:
```bash
npm run dev    # Desarrollo con nodemon
npm start      # Producción
```

### Endpoints principales:

**Sistema SGA:**
- `POST /inicializar-sga` - Crear todas las tablas SGA
- `DELETE /reset-sga` - Eliminar tablas (desarrollo)
- `GET /sga/tablas` - Listar tablas creadas

**Consultas:**
- `GET /sga/aeropuertos` - Aeropuertos con información completa
- `GET /sga/aerolineas` - Aerolíneas y estados
- `GET /sga/aviones` - Flota con modelos
- `GET /sga/vuelos` - Vuelos programados (JOINs)
- `GET /sga/catalogos` - Todos los catálogos

## 🗃️ Estructura del Proyecto

```
aeropuerto_api/
├── src/
│   ├── config/
│   │   ├── db.js              # Configuración Oracle
│   │   └── database-init.js   # Sistema de inicialización SGA
│   ├── controllers/           # Controladores (futuro)
│   ├── middleware/           # Middlewares personalizados
│   ├── models/               # Modelos de datos
│   └── routes/               # Rutas organizadas
├── index.js                  # Punto de entrada
├── package.json              # Dependencias y scripts
└── .env.example             # Plantilla de configuración
```

## 🗄️ Esquema SGA

El sistema incluye 40+ tablas organizadas en:
- **Catálogos:** Estados, tipos, países, ciudades
- **Principales:** Aeropuertos, vuelos, pasajeros, reservas
- **Operaciones:** Equipajes, arrestos, objetos perdidos

## 🔧 Desarrollo

```bash
# Desarrollo con recarga automática
npm run dev

# Verificar estado de la API
curl http://localhost:3000/health

# Ver tablas creadas
curl http://localhost:3000/sga/tablas
```

## 📄 Licencia

Este proyecto es para uso académico - UMG DB II 2026.
