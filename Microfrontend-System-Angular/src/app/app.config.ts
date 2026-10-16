import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

/**
 * Configuración del Microfrontend de System cuando se abre solo (puerto 4203).
 *
 * @remarks
 * Registra el router y el cliente HTTP. Los providers de Clean Architecture
 * (repositorio y casos de uso) NO van aquí sino en `system.providers.ts`,
 * porque cuando el Host carga el microfrontend este archivo no se ejecuta.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ]
};