# 🚀 TaskManager - Full Stack CRUD

Aplicación web Full Stack para la gestión de tareas, permitiendo crear, editar, eliminar y visualizar tareas con distintos estados. El sistema está desarrollado con Angular en el frontend, ASP.NET Core Web API en el backend y SQL Server como base de datos.

📌 Proyecto enfocado en buenas prácticas, arquitectura clara y comunicación entre frontend y backend mediante API REST.

## 🛠️ Tecnologías Utilizadas

### Frontend
* **Angular 20**
* **Angular Material**

### Backend
* **ASP.NET Core 8**
* **ADO.NET**

### Base de Datos
* **SQL Server**
* **Stored Procedures**

## 🏗️ Arquitectura del Sistema

La aplicación utiliza un flujo de datos optimizado:
1.  **Frontend**: Envía peticiones HTTP a un endpoint genérico.
2.  **Backend**: Recibe la entidad y los parámetros, ejecutando el Stored Procedure correspondiente en la base de datos.
3.  **SQL Server**: Procesa la información y devuelve una respuesta en formato JSON directamente.


## ✨ Características Principales
* ✅ **CRUD Completo**: Crear, Leer, Actualizar y Eliminar tareas.
* 🔍 **Filtro en tiempo real**: Buscador optimizado en el frontend.
* ⚠️ **Validaciones robustas**: Formularios reactivos que previenen datos erróneos.
* 🔔 **Notificaciones**: Feedback visual mediante Material SnackBars.
* 🔄 **Motor Genérico**: Capacidad de gestionar múltiples entidades con un solo controlador.

## 🚀 Instalación y Configuración

### 1. Base de Datos
Ejecutar el script SQL incluido en la carpeta `/Database` para crear la tabla `Tareas` y los Stored Procedures (`SIS_Tareas_S`, `SIS_Tareas_IU`, `SIS_Tareas_D`).

### 2. Backend (.NET)
* Navegar a `TaskManager.API/`.
* Actualizar la cadena de conexión en `appsettings.json`.
* Ejecutar:
    ```bash
    dotnet dev-certs https --trust
    dotnet run
    ```

### 3. Frontend (Angular)
* Navegar a `TaskManager.Front/`.
* Instalar dependencias: `npm install`.
* Ejecutar: `ng serve`.
* Abrir en el navegador: `http://localhost:4200`.

## 👤 Autor
* **Matias** - https://github.com/gramajomatias12 

---
Proyecto desarrollado como parte de un entrenamiento intensivo en desarrollo Full Stack.