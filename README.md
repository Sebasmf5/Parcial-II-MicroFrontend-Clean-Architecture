# Parcial-II-Microfrontend-Clean-Architecture

## Microfrontend y Microservicio de System (archivos del sistema)

### Instalar dependencias

- Ubícate en la raíz del proyecto de Microservice-System-NodeJS y ejecuta el comando: `npm i`
- Ubícate en la raíz del proyecto de Microfrontend-System-Angular y ejecuta el comando: `npm i`

### Ejecutar los proyectos

- Ubícate en la raíz del proyecto de Microservice-System-NodeJS y ejecuta el comando: `npm run start`
- Ubícate en la raíz del proyecto de Microfrontend-System-Angular y ejecuta el comando: `npm run start`
- Ubícate en la raíz del proyecto de Client-Host-Angular y ejecuta el comando: `npm run start`

### Verificar funcionamiento

#### Microservice-System-NodeJS
- Corriendo en: `http://localhost:3003`
- Swagger API Docs: `http://localhost:3003/api/docs`
- Listar archivos: `http://localhost:3003/api/system/{countFiles}`
- Detalle de un archivo: `http://localhost:3003/api/system/detail/{id}` (el id es un UUID)
- Filtrar por familia MIME: `http://localhost:3003/api/system/family/{family}/{countFiles}` (application, audio, image, text o video)

#### Microfrontend-System-Angular
- Corriendo en: `http://localhost:4203`
- RemoteEntry: `http://localhost:4203/remoteEntry.js`
- Dentro del Host: `http://localhost:4200/system`

### Mapeo Microfrontend → Microservicio

| Caso de uso (Microfrontend) | Endpoint (Microservicio) |
| --- | --- |
| `GetAllSystemFilesUseCase` | `GET /api/system/{countFiles}` |
| `GetSystemFileByIdUseCase` | `GET /api/system/detail/{id}` |
| `GetSystemFilesByMimeFamilyUseCase` | `GET /api/system/family/{family}/{countFiles}` |

### Pruebas y documentación del Microfrontend de System

- Pruebas unitarias con cobertura (más de 90%, actualmente 100%): `npx jest --coverage`
- Documentación técnica con Compodoc: `npm run compodoc` (genera la carpeta `documentation/`, que no se sube al repositorio)
