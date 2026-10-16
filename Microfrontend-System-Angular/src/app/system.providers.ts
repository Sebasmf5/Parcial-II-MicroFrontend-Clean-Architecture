import { Provider } from '@angular/core';
import { GetAllSystemFilesUseCase } from './core/application/usecases/get-all-system-files.usecase';
import { GetSystemFileByIdUseCase } from './core/application/usecases/get-system-file-by-id.usecase';
import { GetSystemFilesByMimeFamilyUseCase } from './core/application/usecases/get-system-files-by-mime-family.usecase';
import { SystemRepository } from './core/domain/repositories/system.repository';
import { SystemRepositoryImpl } from './core/infrastructure/repositories/system.repository.impl';

/**
 * Providers del módulo System (composición de Clean Architecture).
 *
 * @remarks
 * Aquí se decide qué implementación concreta se entrega cuando
 * alguien pide el contrato `SystemRepository`, y se registran
 * los tres casos de uso del microfrontend.
 *
 * Se declaran en la página expuesta (`SystemPage`) y no en
 * `app.config.ts`, porque cuando el Host carga este microfrontend
 * solo trae la página: el `app.config.ts` del microfrontend no se ejecuta.
 */
export const SYSTEM_MODULE_PROVIDERS: Provider[] = [
  { provide: SystemRepository, useClass: SystemRepositoryImpl },
  GetAllSystemFilesUseCase,
  GetSystemFileByIdUseCase,
  GetSystemFilesByMimeFamilyUseCase,
];