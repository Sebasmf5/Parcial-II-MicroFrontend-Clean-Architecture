# Microfrontend de Commits (Angular)

Microfrontend del Parcial II de Arquitectura de Software (UCEVA). Muestra en una tabla el historial de commits y permite filtrarlos por hash o por correo del autor. Está construido con **Clean Architecture** y **Module Federation**, y consume el microservicio de Spring Boot (`Uceva-SpringBoot-Parcial-Clean-Architecture`) o, si no hay backend, unos datos locales de prueba.

## Tecnologías

- Angular 20 (componentes standalone)
- Webpack Module Federation (`@angular-architects/module-federation`)
- Bootstrap 5 y `@brejcha13320/design-system-bootstrap`
- Jest para las pruebas unitarias
- Compodoc para la documentación del código

## Estructura

```text
src/
├── app/
│   ├── core/
│   │   ├── domain/            # Modelo Commit y contrato CommitRepository
│   │   ├── application/       # Casos de uso (obtener todos, por hash, por autor)
│   │   └── infrastructure/    # DataService y repositorios (local y Spring Boot)
│   ├── mocks/                 # Datos locales de prueba
│   ├── app.config.ts
│   └── app.routes.ts
├── presentation/
│   ├── components/            # alert y commit-table
│   ├── interfaces/            # Tipos State y AlertState
│   └── pages/commits/         # Página que usa los casos de uso
└── environments/              # URL base del backend
```

## Cómo fluyen los datos

```text
CommitsPage → Caso de uso → CommitRepository (contrato) → Implementación → DataService → Mocks o Spring Boot
```

La página y los casos de uso solo conocen el contrato `CommitRepository`. Qué implementación se usa se decide en un solo lugar: `src/app/app.config.ts`. Allí se exporta `commitsProviders`, que la propia página (`CommitsPage`) usa en sus `providers`. Así el repositorio viaja con la página: cuando el Host carga el microfrontend solo trae la página y el `app.config.ts` no se ejecuta.

## Cambiar de fuente de datos

En `src/app/app.config.ts` deja **un solo** provider de `CommitRepository` sin comentar:

```ts
// Datos locales (mocks)
{ provide: CommitRepository, useClass: CommitLocalRepositoryImpl },

// Backend Spring Boot
//{ provide: CommitRepository, useClass: CommitSpringBootRepositoryImpl },
```

Guarda el archivo y recarga el navegador. Si no ves el cambio, reinicia `npm start` y recarga con Ctrl+Shift+R.

## Cómo ejecutarlo

1. **Backend** (solo si usas el provider de Spring Boot). Desde `Uceva-SpringBoot-Parcial-Clean-Architecture`:

   ```bash
   ./gradlew bootRun
   ```

   - API: `http://localhost:8080/commits`
   - Swagger: `http://localhost:8080/swagger-ui/index.html`

2. **Microfrontend.** Desde esta carpeta:

   ```bash
   npm install
   npm start
   ```

   - Aplicación: `http://localhost:4202`
   - Punto de entrada de Module Federation: `http://localhost:4202/remoteEntry.js`

El backend permite peticiones desde `http://localhost:4200` y `http://localhost:4202` (CORS). Si cambias el puerto del microfrontend, actualiza también `CorsConfig` en Spring Boot.

## Endpoints que consume

| Método | Ruta                          | Descripción                      |
| ------ | ----------------------------- | -------------------------------- |
| GET    | `/commits`                    | Todos los commits                |
| GET    | `/commits/{hash}`             | Un commit por su hash            |
| GET    | `/commits/author/{email}`     | Commits de un autor por su correo |

El backend genera los commits en memoria con JavaFaker cada vez que arranca, así que los hashes cambian entre ejecuciones. Los datos locales son fijos: 5 commits con hashes del `0000001` al `0000005`.

## Module Federation

El microfrontend se llama `mf-commits` y expone la página de commits:

```js
exposes: {
  './CommitsPage': './src/presentation/pages/commits/commits.page.ts',
}
```

Un host puede cargarlo así:

```ts
loadRemoteModule({
  type: 'module',
  remoteEntry: 'http://localhost:4202/remoteEntry.js',
  exposedModule: './CommitsPage',
}).then((m) => m.CommitsPage);
```

## Pruebas unitarias

```bash
npm test                # corre todas las pruebas y muestra la cobertura
npm run test:watch      # repite las pruebas al guardar
npx jest commits.page   # solo los archivos cuyo nombre contenga ese texto
```

Hay pruebas para los casos de uso, los repositorios, el `DataService`, los componentes, la página y las rutas.

## Documentación del código

```bash
npm run compodoc
```

Genera la carpeta `documentation/` (ignorada en git). Ábrela con `documentation/index.html`.

## Detalle de la pantalla de carga

La página muestra la alerta "Cargando commits..." durante un mínimo de 800 ms (`MIN_LOADING_MS` en `commits.page.ts`), aunque la respuesta llegue antes. Así la carga se alcanza a ver también con el backend en `localhost` o con los datos locales.
