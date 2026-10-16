# Parcial II - Microfrontend con Clean Architecture

Proyecto del Parcial II de Arquitectura de Software (UCEVA). Un microfrontend en Angular muestra un historial de commits y lo consulta a un microservicio en Spring Boot. Ambos proyectos aplican Clean Architecture.

## Proyectos

| Carpeta                                      | Descripción                                                            | Puerto |
| -------------------------------------------- | ---------------------------------------------------------------------- | ------ |
| `Uceva-SpringBoot-Parcial-Clean-Architecture` | Microservicio que genera commits simulados con JavaFaker               | 8080   |
| `Microfrontend-Commits-Angular`              | Microfrontend con la tabla de commits y los filtros por hash y autor   | 4202   |
| `Microfrontend-Internet-Angular`             | Microfrontend de usuarios de internet (de mi compañero)                | 4201   |
| `Microservice-Internet-NodeJS`               | Microservicio Node.js que consume el microfrontend de Internet         | 3001   |
| `Client-Host-Angular`                        | Host que carga los dos microfrontends con Module Federation            | 4200   |

Cada carpeta tiene su propio `README.md` con los detalles.

## Cómo ejecutarlo

1. Levantar el backend:

   ```bash
   cd Uceva-SpringBoot-Parcial-Clean-Architecture
   ./gradlew bootRun
   ```

2. Levantar el microfrontend:

   ```bash
   cd Microfrontend-Commits-Angular
   npm install
   npm start
   ```

3. Abrir `http://localhost:4202`.

## Ejecutarlo dentro del Host

Para ver los microfrontends integrados se necesitan todos los procesos levantados, cada uno en su propia terminal y con `npm install` hecho una vez:

| Proyecto                         | Comando                                              | URL                     |
| -------------------------------- | ---------------------------------------------------- | ----------------------- |
| `Uceva-SpringBoot-Parcial-Clean-Architecture` | `./gradlew bootRun`                     | `http://localhost:8080` |
| `Microservice-Internet-NodeJS`   | `npm start`                                          | `http://localhost:3001` |
| `Microfrontend-Internet-Angular` | `npm start`                                          | `http://localhost:4201` |
| `Microfrontend-Commits-Angular`  | `npm start`                                          | `http://localhost:4202` |
| `Client-Host-Angular`            | `npm start`                                          | `http://localhost:4200` |

Luego se abre `http://localhost:4200` y se navega a `/internet` o `/commits`.

Notas importantes:

- Module Federation comparte Angular como singleton con `strictVersion`, así que el Host y los microfrontends deben usar **exactamente la misma versión** (`20.3.14`).
- Cuando el Host carga un microfrontend solo trae la página expuesta y su `app.config.ts` no se ejecuta. Por eso cada página declara sus propios `providers` (repositorio y casos de uso).
- El Host redirige cualquier ruta desconocida a `/internet`: si el puerto 4201 no está levantado se verá la pantalla en blanco aunque se entre a `/commits`.

Para trabajar sin el backend, el microfrontend puede usar datos locales: se cambia el provider del repositorio en `Microfrontend-Commits-Angular/src/app/app.config.ts`.

## Pruebas

```bash
cd Microfrontend-Commits-Angular
npm test
```

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
