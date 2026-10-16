# Microfrontend System (Angular)

Microfrontend del módulo **System** (archivos del sistema). Angular 20 + Webpack Module Federation, organizado con **Clean Architecture**. Se carga dentro del Host (`Client-Host-Angular`) en la ruta `/system` y consume el microservicio `Microservice-System-NodeJS`.

## Datos del proyecto

| Dato | Valor |
| --- | --- |
| Puerto | `4203` |
| RemoteEntry | `http://localhost:4203/remoteEntry.js` |
| Nombre en Module Federation | `mf-system` |
| Módulo que expone | `./SystemPage` |
| Microservicio que consume | `Microservice-System-NodeJS` (`http://localhost:3003`) |

## Mapeo Microfrontend → Microservicio

| Caso de uso (MF) | Método del repositorio | Servicio (API Gateway) | Endpoint del microservicio |
| --- | --- | --- | --- |
| `GetAllSystemFilesUseCase` | `getAll(countFiles)` | `getAllFiles` | `GET /api/system/{countFiles}` |
| `GetSystemFileByIdUseCase` | `getById(id)` | `getFileById` | `GET /api/system/detail/{id}` |
| `GetSystemFilesByMimeFamilyUseCase` | `getByMimeFamily(family, countFiles)` | `getFilesByMimeFamily` | `GET /api/system/family/{family}/{countFiles}` |

## Instalación

```bash
npm install
```

## Ejecución

Primero debe estar corriendo el microservicio (puerto 3003). Después:

```bash
npm run start
```

- Microfrontend solo: `http://localhost:4203`
- RemoteEntry: `http://localhost:4203/remoteEntry.js`
- Dentro del Host: `http://localhost:4200/system`

## Pruebas unitarias y cobertura

```bash
npx jest --coverage
```

La cobertura debe quedar por encima del 90% (actualmente 100%). Se mide sobre todo el código de `src` (menos mocks, `main.ts` y `bootstrap.ts`). El reporte queda en la carpeta `coverage/`.

## Documentación técnica con Compodoc

```bash
npm run compodoc
```

Genera la carpeta `documentation/` (no se sube al repositorio). Para verla, abrir `documentation/index.html`.

## Arquitectura (Clean Architecture)

```
src/app/
├── core/
│   ├── domain/                       Capa de dominio (no depende de nada)
│   │   ├── models/system.model.ts            Entidad SystemFile y SystemMimeFamily
│   │   └── repositories/system.repository.ts Contrato (clase abstracta)
│   ├── application/usecases/         Capa de aplicación
│   │   ├── get-all-system-files.usecase.ts
│   │   ├── get-system-file-by-id.usecase.ts
│   │   └── get-system-files-by-mime-family.usecase.ts
│   └── infrastructure/               Capa de infraestructura
│       ├── services/system.service.ts            API Gateway (HTTP al microservicio)
│       └── repositories/system.repository.impl.ts Implementa el contrato del dominio
├── presentation/                     Capa de presentación
│   ├── pages/system/system.page.ts           Página que expone el microfrontend
│   ├── components/                           alert, system-table, system-detail
│   ├── interfaces/state.interface.ts
│   └── utils/format-size.util.ts
├── mocks/system.mocks.ts             Datos de ejemplo para las pruebas
└── system.providers.ts               Composición: contrato → implementación
```

Reglas de dependencia: `presentation` usa los casos de uso; los casos de uso solo conocen el contrato `SystemRepository` (dominio); la implementación (`infrastructure`) es la única que conoce el servicio HTTP y la URL del microservicio (`src/environments/environment.ts`).
