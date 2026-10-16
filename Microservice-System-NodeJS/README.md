# Microservicio System (Node.js)

Microservicio del módulo **System** (archivos del sistema). Node.js + Express + TypeScript, organizado con **Clean Architecture**. Los datos se generan con **faker.js** (`faker.system`). Lo consume el microfrontend `Microfrontend-System-Angular`.

## Datos del proyecto

| Dato | Valor |
| --- | --- |
| Puerto | `3003` |
| Swagger | `http://localhost:3003/api/docs` |
| Datos | `@faker-js/faker` (catálogo fijo de 500 archivos) |

## Instalación y ejecución

```bash
npm install
npm run start
```

## Endpoints (un endpoint por caso de uso)

| Caso de uso | Endpoint | Respuestas |
| --- | --- | --- |
| `GetAllSystemFilesUseCase` | `GET /api/system/{countFiles}` | 200 lista de archivos, 400 cantidad no válida |
| `GetSystemFileByIdUseCase` | `GET /api/system/detail/{id}` (UUID) | 200 archivo, 400 id no válido, 404 no existe |
| `GetSystemFilesByMimeFamilyUseCase` | `GET /api/system/family/{family}/{countFiles}` | 200 lista, 400 familia o cantidad no válida |

Familias MIME permitidas: `application`, `audio`, `image`, `text`, `video` (la familia es lo que va antes de la barra: `image/png` es de la familia `image`).

Cada archivo tiene: `id` (UUID), `fileName`, `mimeType`, `directoryPath`, `size` (bytes) y `createdAt` (YYYY-MM-DD). El catálogo se genera con `faker.seed(posición)`, así que siempre es el mismo: el id que sale en el listado sirve para consultar el detalle.

## Arquitectura (Clean Architecture)

```
src/
├── domain/                           Capa de dominio (no depende de nada)
│   ├── models/system.model.ts                Entidad SystemFile
│   └── repositories/system.repository.ts     Contrato (clase abstracta)
├── application/usecases/             Capa de aplicación (un archivo por caso de uso)
│   ├── get-all-system-files.usecase.ts
│   ├── get-system-file-by-id.usecase.ts
│   └── get-system-files-by-mime-family.usecase.ts
├── infrastructure/                   Capa de infraestructura
│   ├── datasources/system.datasource.ts      Genera los datos con faker
│   ├── repositories/system.repository.impl.ts Implementa el contrato del dominio
│   └── web/                                   Express: server, routes, controllers, errors, config (envs, swagger)
└── app.ts                            Punto de entrada
```

Composición: en `routes/system.routes.ts` se crea `SystemDatasource` → `SystemRepositoryImpl` → los 3 casos de uso → `SystemController`.
