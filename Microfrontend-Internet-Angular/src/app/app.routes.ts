import { Routes } from '@angular/router';

/**
 * Rutas del Microfrontend de Internet cuando se abre solo (puerto 4201).
 *
 * @remarks
 * La ruta raíz carga `InternetPage`, la misma página que se expone al Host.
 */
export const routes: Routes = [
  /**
   * Ruta de usuarios de internet.
   */
  { path: '', loadComponent: () => import('./presentation/pages/internet/internet.page').then((m) => m.InternetPage) },
];