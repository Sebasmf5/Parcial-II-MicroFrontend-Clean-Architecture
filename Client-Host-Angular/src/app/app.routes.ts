import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

/**
 * Definición de las rutas principales del Host.
 *
 * @remarks
 * Cada ruta carga de forma remota la página que expone uno de los
 * microfrontends mediante Module Federation (`remoteEntry.js`).
 *
 * Incluye:
 * - Una ruta por microfrontend
 * - Redirección por defecto para rutas no existentes
 */
export const routes: Routes = [
 /**
   * Ruta de usuarios de internet.
   *
   * @remarks
   * Carga de forma remota el componente `InternetPage`
   * expuesto por el Microfrontend de Internet (puerto 4201).
   */
  {
    path: 'internet',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './InternetPage',
      }).then(m => m.InternetPage),
  },

  /**
   * Ruta comodín.
   *
   * @remarks
   * Captura cualquier ruta no definida y redirige
   * automáticamente a la ruta de internet.
   */
  { path: '**', redirectTo: 'internet' },
];