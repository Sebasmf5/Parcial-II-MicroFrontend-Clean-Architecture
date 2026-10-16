# Microservicio de commits con Spring Boot

Microservicio del parcial de Microfrontends y Clean Architecture. Su responsabilidad es consultar commits simulados de Git para que el microfrontend los presente en una tabla.

## Tecnologia

- Java 17
- Spring Boot
- Gradle
- JavaFaker
- Springdoc OpenAPI / Swagger

## Arquitectura

El proyecto sigue Clean Architecture:

```text
infrastructure/controller
        |
        v
application/usecase
        |
        v
domain/repository
        |
        v
infrastructure/repository
        |
        v
infrastructure/datasource
        |
        v
JavaFaker
```

### Capas

- `domain/entity`: contiene la entidad `Commit`.
- `domain/repository`: contiene el contrato `CommitRepository`.
- `application/usecase`: contiene los casos de uso para consultar commits.
- `infrastructure/repository`: implementa el contrato del dominio.
- `infrastructure/datasource`: genera y conserva los datos en memoria con JavaFaker.
- `infrastructure/controller`: expone los endpoints REST.
- `config`: configura los beans, CORS y OpenAPI.

## Datos

No se utiliza una base de datos. Al iniciar la aplicacion se generan 20 commits simulados con JavaFaker y se mantienen en memoria mientras el proceso esta activo.

Los datos se generan nuevamente al reiniciar Spring Boot. Los commits se distribuyen entre cinco autores para que el filtro por correo devuelva varios resultados.

## Casos de uso

- `GetAllCommitsUseCase`: obtiene todos los commits.
- `GetCommitByHashUseCase`: obtiene un commit por su hash.
- `GetCommitsByAuthorEmailUseCase`: filtra commits por correo del autor.

## Endpoints

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/commits` | Obtiene los 20 commits generados. |
| `GET` | `/commits/{hash}` | Obtiene un commit por hash. Devuelve `404` si no existe. |
| `GET` | `/commits/author/{authorEmail}` | Obtiene los commits de un autor. |

Ejemplos:

```text
http://localhost:8080/commits
http://localhost:8080/commits/0000001
http://localhost:8080/commits/author/alguien@example.com
```

## Swagger

Swagger se genera automaticamente con Springdoc.

- Interfaz: `http://localhost:8080/swagger-ui/index.html`
- Especificacion OpenAPI: `http://localhost:8080/v3/api-docs`

La configuracion personalizada esta en `config/OpenApiConfig.java`.

## CORS

El microservicio permite solicitudes desde:

- `http://localhost:4200`: host Angular.
- `http://localhost:4202`: microfrontend ejecutado de forma independiente.

La configuracion esta en `config/CorsConfig.java`.

## Ejecucion

Desde esta carpeta, ejecuta:

```powershell
.\gradlew.bat bootRun
```

El servicio queda disponible en:

```text
http://localhost:8080
```

Para compilar:

```powershell
.\gradlew.bat clean build
```

Para ejecutar las pruebas:

```powershell
.\gradlew.bat test
```

## Requisitos

- JDK 17 o superior compatible con el toolchain configurado.
- Conexion a internet para descargar dependencias Gradle la primera vez.
- Puerto `8080` disponible.

## Persistencia

Este proyecto no persiste informacion. Los datos de Faker son temporales y se eliminan al detener o reiniciar la aplicacion.
