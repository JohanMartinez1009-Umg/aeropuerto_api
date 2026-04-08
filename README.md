# �️ Sistema de Gestión de Aeropuerto (SGA) - API REST

Una API REST completa para la gestión integral de operaciones aeroportuarias, desarrollada con Node.js, Express y Oracle Database.

## 🚀 Características

- **CRUD completo** para todas las entidades del aeropuerto
- **50+ entidades** con modelos, controladores y endpoints automatizados
- **Relaciones complejas** entre vuelos, pasajeros, empleados y operaciones
- **Consultas especializadas** con información detallada
- **Base de datos Oracle** con integridad referencial completa
- **Arquitectura modular** y escalable

## 📋 Entidades Principales

### 🏢 **Catálogos Base**
- Países, Ciudades, Estados (aeropuerto, aerolínea, vuelo, etc.)
- Tipos de vuelo, equipaje, ubicación, eventos
- Roles, permisos, puestos, departamentos

### ✈️ **Operaciones de Vuelo**
- Aeropuertos, Aerolíneas, Aviones, Modelos
- Programas de vuelo, Vuelos, Escalas técnicas
- Pistas, Terminales, Puertas de embarque

### 👥 **Gestión de Pasajeros**
- Pasajeros, Reservas, Boletos, Equipaje
- Check-in, Asientos, Abordaje
- Objetos perdidos, Arrestos

### 👨‍✈️ **Personal y Operaciones**
- Empleados, Asignaciones, Turnos
- Tripulación de vuelos, Mantenimiento
- Usuarios del sistema, Roles y permisos

### 💰 **Pagos y Finanzas**
- Pagos, Métodos de pago, Reembolsos
- Historial de transacciones

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 16+
- Oracle Database 12c+
- Git

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd aeropuerto_api

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Oracle
```

### Configuración de Base de Datos
```bash
# Crear archivo .env con:
DB_HOST=localhost
DB_PORT=1521
DB_SID=orcl
DB_USER=tu_usuario
DB_PASSWORD=tu_password
```

### Inicializar Base de Datos
```bash
# Iniciar servidor
npm run dev

# Llamar endpoint de inicialización
POST http://localhost:3000/sga/inicializar
```

## 📚 Uso de la API

### URL Base
```
http://localhost:3000
```

### Endpoints Principales

#### 📊 **Información General**
```bash
GET /health                    # Estado de la API
GET /db/test                   # Prueba conexión DB
GET /sga                       # Documentación completa
GET /sga/tablas               # Lista tablas creadas
```

#### 🔧 **Administración BD**
```bash
POST /sga/inicializar         # Crear todas las tablas
DELETE /sga/eliminar-todo     # Eliminar todas las tablas
```

### 🛩️ **Operaciones CRUD Estándar**

Cada entidad sigue el patrón REST estándar:

```bash
# Listar todos
GET /sga/{entidad}

# Obtener por ID
GET /sga/{entidad}/{id}

# Crear nuevo
POST /sga/{entidad}

# Actualizar
PUT /sga/{entidad}/{id}

# Eliminar
DELETE /sga/{entidad}/{id}

# Contar registros
GET /sga/{entidad}/count
```

### 📋 **Entidades Disponibles**

#### Catálogos
```bash
/sga/pais                     # Países
/sga/ciudad                   # Ciudades
/sga/estado-aeropuerto        # Estados de aeropuerto
/sga/estado-aerolinea         # Estados de aerolínea
/sga/estado-vuelo             # Estados de vuelo
/sga/tipo-vuelo               # Tipos de vuelo
/sga/clase-boleto             # Clases de boleto
/sga/tipo-equipaje            # Tipos de equipaje
/sga/puesto                   # Puestos de trabajo
/sga/departamento             # Departamentos
/sga/rol                      # Roles del sistema
/sga/permiso                  # Permisos
```

#### Entidades Principal
```bash
/sga/aeropuerto              # Aeropuertos
/sga/aerolinea               # Aerolíneas
/sga/avion                   # Aviones
/sga/vuelo                   # Vuelos
/sga/pasajero                # Pasajeros
/sga/empleado                # Empleados
/sga/reserva                 # Reservas
/sga/boleto                  # Boletos
/sga/equipaje                # Equipaje
```

#### Operaciones Avanzadas
```bash
/sga/asiento                 # Asientos
/sga/checkin                 # Check-in
/sga/pago                    # Pagos
/sga/reembolso               # Reembolsos
/sga/mantenimiento-avion     # Mantenimiento
/sga/tripulacion-vuelo       # Tripulación
/sga/usuario                 # Usuarios del sistema
```

### 🔍 **Consultas Especializadas**

#### Vuelos
```bash
GET /sga/vuelo/details                    # Vuelos con info completa
GET /sga/vuelo/fecha/2024-12-25          # Vuelos por fecha
```

#### Pasajeros
```bash
GET /sga/pasajero/details                 # Pasajeros con país
GET /sga/pasajero/pasaporte/{passport}    # Buscar por pasaporte
```

#### Usuarios
```bash
GET /sga/usuario/username/{username}      # Buscar por username
```

#### Vuelos Específicos
```bash
GET /sga/pasajero-vuelo/vuelo/{id}       # Pasajeros de un vuelo
GET /sga/tripulacion-vuelo/vuelo/{id}    # Tripulación de un vuelo
GET /sga/historial-vuelo/vuelo/{id}      # Historial de un vuelo
```

#### Asientos
```bash
GET /sga/asiento/avion/{id}              # Asientos de un avión
```

#### Permisos
```bash
GET /sga/rol-permiso/rol/{id}            # Permisos de un rol
```

### 💡 **Ejemplos de Uso**

#### 1. Crear un nuevo pasajero
```bash
POST /sga/pasajero
Content-Type: application/json

{
  "PAS_PRIMER_NOMBRE": "Juan",
  "PAS_SEGUNDO_NOMBRE": "Carlos",
  "PAS_PRIMER_APELLIDO": "García",
  "PAS_SEGUNDO_APELLIDO": "López",
  "PAS_PASAPORTE": "A12345678",
  "PAS_FECHA_NACIMIENTO": "1990-05-15",
  "PA_ID_PAIS": 1,
  "PAS_TELEFONO": "+502 1234-5678",
  "PAS_EMAIL": "juan.garcia@email.com"
}
```

#### 2. Buscar vuelos de una fecha
```bash
GET /sga/vuelo/fecha/2024-12-25
```

#### 3. Obtener información completa de aeropuertos
```bash
GET /sga/aeropuerto
```

#### 4. Crear una reserva
```bash
POST /sga/reserva
Content-Type: application/json

{
  "PAS_ID_PASAJERO": 1,
  "ESR_ID": 1,
  "REV_PRECIO": 850.00
}
```

### 📊 **Filtros y Parámetros de Consulta**

```bash
# Filtrar por campos específicos
GET /sga/vuelo?ESV_ID_ESTADO_VUELO=1

# Limitar resultados
GET /sga/pasajero?limit=10

# Ordenar resultados
GET /sga/empleado?orderBy=EMP_PRIMER_APELLIDO

# Combinar filtros
GET /sga/reserva?ESR_ID=1&limit=5&orderBy=REV_FECHA DESC
```

### 🔒 **Respuestas de la API**

#### Respuesta Exitosa
```json
{
  "success": true,
  "data": [...],
  "total": 25,
  "entity": "Vuelo"
}
```

#### Respuesta de Error
```json
{
  "success": false,
  "message": "Error al obtener vuelos",
  "error": "Detalles del error"
}
```

## 🏗️ **Arquitectura del Proyecto**

```
aeropuerto_api/
├── src/
│   ├── config/
│   │   ├── db.js              # Configuración Oracle
│   │   └── database-init.js   # Inicialización BD
│   ├── models/
│   │   ├── BaseModel.js       # Modelo base CRUD
│   │   ├── CatalogModels.js   # Modelos catálogos
│   │   ├── MainModels.js      # Modelos principales
│   │   ├── OperationModels.js # Modelos operaciones
│   │   ├── ExtendedModels.js  # Modelos extendidos
│   │   └── index.js           # Índice modelos
│   ├── controllers/
│   │   ├── BaseController.js  # Controlador base
│   │   └── index.js           # Controladores especializados
│   └── routes/
│       ├── routeGenerator.js  # Generador rutas
│       └── index.js           # Rutas principales
├── index.js                   # Servidor principal
├── package.json
└── README.md
```

## 🚧 **Scripts Disponibles**

```bash
npm start                      # Iniciar servidor producción
npm run dev                    # Iniciar servidor desarrollo
```

## 📈 **Características Avanzadas**

### 🔍 **Consultas Inteligentes**
- Joins automáticos con información relacionada
- Filtros dinámicos por cualquier campo
- Paginación y ordenamiento flexible

### 🛡️ **Integridad de Datos**
- Validación de llaves foráneas
- Restricciones de integridad referencial
- Manejo de errores Oracle específicos

### 🎯 **Rendimiento Optimizado**
- Conexiones eficientes a Oracle
- Consultas optimizadas con índices
- Pool de conexiones reutilizable

## 🤝 **Contribución**

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit cambios (`git commit -am 'Agregar nueva característica'`)
4. Push rama (`git push origin feature/nueva-caracteristica`)
5. Crear Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 **Desarrollado por**

Proyecto de base de datos para Sistema de Gestión Aeroportuaria  
Universidad Mesoamericana - Ingeniería en Sistemas  

---

🛩️ **¡Sistema SGA listo para despegar!** ✈️

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
