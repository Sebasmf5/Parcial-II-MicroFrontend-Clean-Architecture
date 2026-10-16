import { Provider } from '@angular/core';
import { GetAllInternetUsersUseCase } from './core/application/usecases/get-all-internet-users.usecase';
import { GetInternetUserByIdUseCase } from './core/application/usecases/get-internet-user-by-id.usecase';
import { GetInternetUsersByProviderUseCase } from './core/application/usecases/get-internet-users-by-provider.usecase';
import { InternetRepository } from './core/domain/repositories/internet.repository';
import { InternetRepositoryImpl } from './core/infrastructure/repositories/internet.repository.impl';

/**
 * Providers del módulo Internet (composición de Clean Architecture).
 *
 * @remarks
 * Aquí se decide qué implementación concreta se entrega cuando
 * alguien pide el contrato `InternetRepository`, y se registran
 * los tres casos de uso del microfrontend.
 *
 * Se declaran en la página expuesta (`InternetPage`) y no en
 * `app.config.ts`, porque cuando el Host carga este microfrontend
 * solo trae la página: el `app.config.ts` del microfrontend no se ejecuta.
 */
export const INTERNET_MODULE_PROVIDERS: Provider[] = [
  { provide: InternetRepository, useClass: InternetRepositoryImpl },
  GetAllInternetUsersUseCase,
  GetInternetUserByIdUseCase,
  GetInternetUsersByProviderUseCase,
];