Microfrontend-Internet-Angular/
├── webpack.config.js, jest.config.js, setup-jest.ts, tsconfig.doc.json, ...
└── src/
    ├── environments/environment.ts
    └── app/
        ├── core/
        │   ├── domain/models/internet.model.ts
        │   ├── domain/repositories/internet.repository.ts
        │   ├── application/usecases/            (3 casos de uso + specs)
        │   └── infrastructure/
        │       ├── services/internet.service.ts           (API Gateway)
        │       └── repositories/internet.repository.impl.ts
        ├── presentation/
        │   ├── components/alert | internet-table | internet-detail
        │   ├── interfaces/state.interface.ts
        │   └── pages/internet/internet.page.ts            (la que ve el Host)
        ├── mocks/internet.mocks.ts
        ├── internet.providers.ts                          (composición)
        └── app.ts, app.config.ts, app.routes.ts