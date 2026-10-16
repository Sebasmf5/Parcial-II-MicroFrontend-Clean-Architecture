import { Routes } from '@angular/router';

/**
 * Definición de las rutas principales de la aplicación.
 *
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes correspondientes.
 *
 * Incluye:
 * - Rutas de navegación principales
 * - Redirección por defecto para rutas no existentes
 *
 */
export const routes: Routes = [
  /**
   * Ruta de commits.
   *
   * @remarks
   * Renderiza el componente `CommitsPage`, encargado
   * de mostrar y gestionar el listado de commits.
   */
  { path: '', loadComponent: () => import('../presentation/pages/commits/commits.page').then((m) => m.CommitsPage) },
];