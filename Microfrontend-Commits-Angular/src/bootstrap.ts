/**
 * Arranque de la aplicación Angular.
 *
 * @remarks
 * Inicia el componente raíz `App` con la configuración global de
 * `appConfig`. Es cargado de forma dinámica desde `main.ts`, un
 * requisito de Module Federation para compartir dependencias.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
