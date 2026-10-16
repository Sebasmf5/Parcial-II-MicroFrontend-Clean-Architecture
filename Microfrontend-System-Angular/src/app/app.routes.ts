import { Routes } from '@angular/router';

/**
 * Rutas del Microfrontend de System cuando se abre solo (puerto 4203).
 *
 * @remarks
 * La ruta raíz carga `SystemPage`, la misma página que se expone al Host.
 */
export const routes: Routes = [
  /**
   * Ruta de archivos del sistema.
   */
  { path: '', loadComponent: () => import('./presentation/pages/system/system.page').then((m) => m.SystemPage) },
];