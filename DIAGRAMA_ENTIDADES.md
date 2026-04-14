# SGA – Diagrama de Relaciones entre Entidades

> Renderiza este archivo en VS Code con la extensión **Markdown Preview Mermaid Support**,
> o pégalo en [mermaid.live](https://mermaid.live).

---

## 🗂️ Módulo 1 – Geografía y Aeropuertos

```mermaid
erDiagram
    PAIS {
        int PA_ID_PAIS PK
        string PA_NOMBRE
        string PA_CODIGO
    }
    CIUDAD {
        int CD_ID_CIUDAD PK
        int PA_ID_PAIS FK
        string CD_NOMBRE
    }
    ESTADO_AEROPUERTO {
        int EAP_ID_ESTADO_AEROPUERTO PK
        string EAP_DESCRIPCION
    }
    TERMINAL {
        int TRM_ID_TERMINAL PK
        int APT_ID_AEROPUERTO FK
        string TRM_NOMBRE
    }
    AEROPUERTO {
        int APT_ID_AEROPUERTO PK
        int APT_ID_CIUDAD FK
        int EAP_ID_ESTADO_AEROPUERTO FK
        string APT_NOMBRE
        string APT_CODIGO
    }
    PUERTA_EMBARQUE {
        int PTE_ID_PUERTA PK
        int APT_ID_AEROPUERTO FK
        int TRM_ID_TERMINAL FK
        string PTE_NUMERO_PUERTA
    }
    PISTA {
        int PST_ID_PISTA PK
        int APT_ID_AEROPUERTO FK
        string PST_CODIGO
    }

    PAIS         ||--o{ CIUDAD           : "tiene"
    CIUDAD       ||--o{ AEROPUERTO       : "tiene"
    ESTADO_AEROPUERTO ||--o{ AEROPUERTO  : "clasifica"
    AEROPUERTO   ||--o{ TERMINAL         : "tiene"
    AEROPUERTO   ||--o{ PUERTA_EMBARQUE  : "tiene"
    AEROPUERTO   ||--o{ PISTA            : "tiene"
    TERMINAL     ||--o{ PUERTA_EMBARQUE  : "agrupa"
```

---

## ✈️ Módulo 2 – Flota y Vuelos

```mermaid
erDiagram
    ESTADO_AEROLINEA {
        int EAL_ID PK
        string EAL_DESCRIPCION
    }
    AEROLINEA {
        int ARL_ID_AEROLINEA PK
        int EAL_ID FK
        string ARL_NOMBRE
        string ARL_CODIGO_IATA
    }
    MODELO_AVION {
        int MDA_ID_MODELO PK
        string MDA_NOMBRE_MODELO
        int MDA_CAPACIDAD_PASAJEROS
    }
    ESTADO_AVION {
        int EAV_ID_ESTADO_AVION PK
        string EAV_DESCRIPCION
    }
    AVION {
        int AVN_ID_AVION PK
        int MDA_ID_MODELO FK
        int EAV_ID_ESTADO_AVION FK
        string AVN_MATRICULA
    }
    TIPO_VUELO {
        int ID_TIPO_VUELO PK
        string TV_DESCRIPCION
    }
    PROGRAMA_VUELO {
        int PRV_ID_PROGRAMA PK
        int ARL_ID_AEROLINEA FK
        int ID_AEROPUERTO_ORIGEN FK
        int ID_AEROPUERTO_DESTINO FK
        int ID_TIPO_VUELO FK
        string PRV_NUMERO_VUELO
    }
    DIA {
        int DIA_ID_DIA PK
        string DIA_NOMBRE
    }
    DIA_PROGRAMA_VUELO {
        int DPV_ID_DIA_PROGRAMA PK
        int PRV_ID_PROGRAMA FK
        int DIA_ID_DIA FK
    }
    ESTADO_VUELO {
        int ESV_ID_ESTADO_VUELO PK
        string ESV_DESCRIPCION
    }
    VUELO {
        int VL_ID_VUELO PK
        int PRV_ID_PROGRAMA FK
        int AVN_ID_AVION FK
        int ESV_ID_ESTADO_VUELO FK
        date VL_FECHA
    }
    ESCALA_TECNICA {
        int ET_ID_ESCALA PK
        int VL_ID_VUELO FK
        int APT_ID_AEROPUERTO FK
    }

    ESTADO_AEROLINEA   ||--o{ AEROLINEA          : "clasifica"
    MODELO_AVION       ||--o{ AVION               : "define"
    ESTADO_AVION       ||--o{ AVION               : "clasifica"
    TIPO_VUELO         ||--o{ PROGRAMA_VUELO       : "clasifica"
    AEROLINEA          ||--o{ PROGRAMA_VUELO       : "opera"
    PROGRAMA_VUELO     ||--o{ DIA_PROGRAMA_VUELO   : "tiene"
    DIA                ||--o{ DIA_PROGRAMA_VUELO   : "aplica"
    PROGRAMA_VUELO     ||--o{ VUELO                : "genera"
    AVION              ||--o{ VUELO                : "asignado a"
    ESTADO_VUELO       ||--o{ VUELO                : "clasifica"
    VUELO              ||--o{ ESCALA_TECNICA        : "tiene"
```

---

## 👥 Módulo 3 – Pasajeros y Reservas

```mermaid
erDiagram
    PAIS {
        int PA_ID_PAIS PK
        string PA_NOMBRE
    }
    PASAJERO {
        int PAS_ID_PASAJERO PK
        int PA_ID_PAIS FK
        string PAS_PASAPORTE
        string PAS_PRIMER_NOMBRE
        string PAS_PRIMER_APELLIDO
        string PAS_EMAIL
    }
    ESTADO_RESERVA {
        int ESR_ID PK
        string ESR_DESCRIPCION
    }
    RESERVA {
        int REV_ID_RESERVA PK
        int PAS_ID_PASAJERO FK
        int ESR_ID FK
        decimal REV_PRECIO
        date REV_FECHA
    }
    CLASE_BOLETO {
        int CLB_ID_CLASE_BOLETO PK
        string CLB_DESCRIPCION
    }
    BOLETO {
        int BLT_ID_BOLETO PK
        int REV_ID_RESERVA FK
        int CLB_ID_CLASE_BOLETO FK
    }
    DETALLE {
        int DTR_ID_DETALLE PK
        int REV_ID_RESERVA FK
        int VL_ID_VUELO FK
    }
    TIPO_EQUIPAJE {
        int TEQ_ID PK
        string TEQ_DESCRIPCION
    }
    EQUIPAJE {
        int EQP_EQUIPAJE PK
        int BLT_ID_BOLETO FK
        int TEQ_ID FK
        decimal EQP_PESO
    }
    METODO_PAGO {
        int MPG_ID PK
        string MPG_NOMBRE
    }
    PAGO {
        int PAG_ID PK
        int REV_ID_RESERVA FK
        int MPG_ID FK
        decimal PAG_MONTO
        date PAG_FECHA
    }
    ESTADO_REEMBOLSO {
        int ESR_ID PK
        string ESR_NOMBRE
    }
    REEMBOLSO {
        int REM_ID PK
        int PAG_ID FK
        int ESR_ID FK
        decimal REM_MONTO
        date REM_FECHA
    }

    PAIS              ||--o{ PASAJERO     : "es de"
    PASAJERO          ||--o{ RESERVA      : "hace"
    ESTADO_RESERVA    ||--o{ RESERVA      : "clasifica"
    RESERVA           ||--o{ BOLETO       : "genera"
    RESERVA           ||--o{ DETALLE      : "detalla vuelo"
    RESERVA           ||--o{ PAGO         : "tiene"
    CLASE_BOLETO      ||--o{ BOLETO       : "define"
    BOLETO            ||--o{ EQUIPAJE     : "lleva"
    TIPO_EQUIPAJE     ||--o{ EQUIPAJE     : "clasifica"
    METODO_PAGO       ||--o{ PAGO         : "usa"
    PAGO              ||--o{ REEMBOLSO    : "origina"
    ESTADO_REEMBOLSO  ||--o{ REEMBOLSO    : "clasifica"
```

---

## 🛬 Módulo 4 – Operaciones de Vuelo (Pasajero ↔ Vuelo)

```mermaid
erDiagram
    PASAJERO {
        int PAS_ID_PASAJERO PK
        string PAS_PASAPORTE
        string PAS_PRIMER_NOMBRE
    }
    VUELO {
        int VL_ID_VUELO PK
        date VL_FECHA
    }
    BOLETO {
        int BLT_ID_BOLETO PK
        int REV_ID_RESERVA FK
    }
    ASIENTO {
        int ASI_ID_ASIENTO PK
        int AVN_ID_AVION FK
        int CLB_ID_CLASE_BOLETO FK
        string ASI_NUMERO
    }
    ESTADO_ASIENTO {
        int EAS_ID PK
        string EAS_NOMBRE
    }
    ASIGNACION_ASIENTO {
        int ASA_ID_ASIGNACION PK
        int BLT_ID_BOLETO FK
        int ASI_ID_ASIENTO FK
        int VL_ID_VUELO FK
        int EAS_ID FK
    }
    ESTADO_CHECKIN {
        int ECK_ID_ESTADO PK
        string ECK_NOMBRE
    }
    CHECKIN {
        int CHK_ID PK
        int PAS_ID_PASAJERO FK
        int VL_ID_VUELO FK
        int ECK_ID_ESTADO FK
        datetime CHK_FECHA_CHECKIN
    }
    ESTADO_ABORDAJE {
        int EAB_ID_ESTADO_ABORDAJE PK
        string EAB_NOMBRE
    }
    PASAJERO_VUELO {
        int ID_PASAJERO_VUELO PK
        int PAS_ID_PASAJERO FK
        int VL_ID_VUELO FK
        int EAB_ID_ESTADO_ABORDAJE FK
    }
    ESTADO_ASIGNACION {
        int EAS_ID_ESTADO_ASIGNACION PK
        string EAS_DESCRIPCION
    }
    ASIGNACION_PUERTA {
        int ASP_ID_ASIGNACION PK
        int VL_ID_VUELO FK
        int PTE_ID_PUERTA FK
        int EAS_ID_ESTADO_ASIGNACION FK
    }
    TIPO_EVENTO {
        int TE_ID PK
        string TE_DESCRIPCION
    }
    HISTORIAL_VUELO {
        int HVL_ID_HISTORIAL PK
        int VL_ID_VUELO FK
        int TE_ID FK
        int ESV_ESTADO_PREVIO FK
        int ESV_ESTADO_ACTUAL FK
    }

    PASAJERO           ||--o{ CHECKIN             : "realiza"
    PASAJERO           ||--o{ PASAJERO_VUELO      : "aborda"
    VUELO              ||--o{ CHECKIN             : "en"
    VUELO              ||--o{ PASAJERO_VUELO      : "tiene"
    VUELO              ||--o{ ASIGNACION_PUERTA   : "usa"
    VUELO              ||--o{ HISTORIAL_VUELO     : "registra"
    BOLETO             ||--o{ ASIGNACION_ASIENTO  : "ocupa"
    ASIENTO            ||--o{ ASIGNACION_ASIENTO  : "asignado en"
    ESTADO_ASIENTO     ||--o{ ASIGNACION_ASIENTO  : "clasifica"
    ESTADO_CHECKIN     ||--o{ CHECKIN             : "clasifica"
    ESTADO_ABORDAJE    ||--o{ PASAJERO_VUELO      : "clasifica"
    ESTADO_ASIGNACION  ||--o{ ASIGNACION_PUERTA   : "clasifica"
    TIPO_EVENTO        ||--o{ HISTORIAL_VUELO     : "clasifica"
```

---

## 👨‍✈️ Módulo 5 – Personal y Tripulación

```mermaid
erDiagram
    PUESTO {
        int PTS_ID_PUESTO PK
        string PTS_NOMBRE
    }
    DEPARTAMENTO {
        int DEP_ID PK
        string DEP_NOMBRE
    }
    ESTADO_EMPLEADO {
        int EEP_ID PK
        string EEP_DESCRIPCION
    }
    EMPLEADO {
        int EMP_ID_EMPLEADO PK
        int PTS_ID_PUESTO FK
        int DEP_ID FK
        int EEP_ID FK
        string EMP_PRIMER_NOMBRE
        string EMP_PRIMER_APELLIDO
    }
    ROL {
        int ROL_ID_ROL PK
        string ROL_NOMBRE
    }
    PERMISO {
        int PER_ID_PERMISO PK
        string PER_NOMBRE
    }
    ROL_PERMISO {
        int ROL_ID_ROL FK
        int PER_ID_PERMISO FK
    }
    USUARIO {
        int USR_ID_USUARIO PK
        int EMP_ID_EMPLEADO FK
        int ROL_ID_ROL FK
        string USR_USERNAME
    }
    TURNO {
        int TRN_ID PK
        string TRN_NOMBRE
    }
    ASIGNACION_EMPLEADO {
        int ASE_ID PK
        int EMP_ID_EMPLEADO FK
        int TRN_ID FK
        int VL_ID_VUELO FK
        int PTE_ID_PUERTA FK
    }
    ROL_TRIPULACION {
        int RTC_ID_ROL_TRIPULACION PK
        string RTC_NOMBRE
    }
    TRIPULACION_VUELO {
        int TRV_ID_TRIPULACION PK
        int EMP_ID_EMPLEADO FK
        int VL_ID_VUELO FK
        int RTC_ID_ROL_TRIPULACION FK
    }
    MANTENIMIENTO_AVION {
        int MAV_ID PK
        int AVN_ID_AVION FK
        int EMP_ID_EMPLEADO FK
        date MAV_FECHA_INICIO
    }

    PUESTO             ||--o{ EMPLEADO              : "tiene"
    DEPARTAMENTO       ||--o{ EMPLEADO              : "pertenece"
    ESTADO_EMPLEADO    ||--o{ EMPLEADO              : "clasifica"
    EMPLEADO           ||--o{ USUARIO               : "accede con"
    EMPLEADO           ||--o{ ASIGNACION_EMPLEADO   : "asignado en"
    EMPLEADO           ||--o{ TRIPULACION_VUELO     : "integra"
    EMPLEADO           ||--o{ MANTENIMIENTO_AVION   : "realiza"
    ROL                ||--o{ USUARIO               : "tiene"
    ROL                ||--o{ ROL_PERMISO           : "agrupa"
    PERMISO            ||--o{ ROL_PERMISO           : "asignado en"
    TURNO              ||--o{ ASIGNACION_EMPLEADO   : "define"
    ROL_TRIPULACION    ||--o{ TRIPULACION_VUELO     : "clasifica"
```

---

## 🔗 Módulo 6 – Vista General de Relaciones Clave

```mermaid
flowchart TD
    subgraph CAT["📋 Catálogos"]
        PAIS
        CIUDAD
        CLASE_BOLETO
        TIPO_EQUIPAJE
        PUESTO
        DEPARTAMENTO
        ROL
        PERMISO
        TURNO
        METODO_PAGO
    end

    subgraph INFRA["🏢 Infraestructura"]
        AEROPUERTO
        TERMINAL
        PUERTA_EMBARQUE
        PISTA
    end

    subgraph FLOTA["✈️ Flota"]
        MODELO_AVION
        AVION
        ASIENTO
    end

    subgraph VUELOS["🛫 Vuelos"]
        AEROLINEA
        PROGRAMA_VUELO
        VUELO
        ESCALA_TECNICA
        HISTORIAL_VUELO
        ASIGNACION_PUERTA
        ASIGNACION_PISTA
    end

    subgraph PASAJEROS["👥 Pasajeros"]
        PASAJERO
        RESERVA
        BOLETO
        DETALLE
        EQUIPAJE
        CHECKIN
        PASAJERO_VUELO
        ASIGNACION_ASIENTO
    end

    subgraph FINANZAS["💰 Finanzas"]
        PAGO
        REEMBOLSO
    end

    subgraph PERSONAL["👨‍✈️ Personal"]
        EMPLEADO
        USUARIO
        ROL_PERMISO
        TRIPULACION_VUELO
        ASIGNACION_EMPLEADO
        MANTENIMIENTO_AVION
    end

    subgraph SEGURIDAD["🔒 Seguridad"]
        OBJETO_PERDIDO
        ARRESTO
    end

    PAIS --> CIUDAD --> AEROPUERTO
    AEROPUERTO --> TERMINAL --> PUERTA_EMBARQUE
    AEROPUERTO --> PISTA

    AEROLINEA --> PROGRAMA_VUELO --> VUELO
    AVION --> VUELO
    MODELO_AVION --> AVION
    AVION --> ASIENTO

    PASAJERO --> RESERVA --> BOLETO
    RESERVA --> DETALLE --> VUELO
    BOLETO --> EQUIPAJE
    BOLETO --> ASIGNACION_ASIENTO --> ASIENTO

    PASAJERO --> CHECKIN --> VUELO
    PASAJERO --> PASAJERO_VUELO --> VUELO

    RESERVA --> PAGO --> REEMBOLSO
    VUELO --> ASIGNACION_PUERTA --> PUERTA_EMBARQUE
    VUELO --> ASIGNACION_PISTA --> PISTA
    VUELO --> HISTORIAL_VUELO

    EMPLEADO --> TRIPULACION_VUELO --> VUELO
    EMPLEADO --> MANTENIMIENTO_AVION --> AVION
    EMPLEADO --> ASIGNACION_EMPLEADO
    EMPLEADO --> USUARIO --> ROL --> ROL_PERMISO --> PERMISO

    PASAJERO --> OBJETO_PERDIDO
    PASAJERO --> ARRESTO
```
