import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


/**
 * Componente raíz de la aplicación.
 *
 * @remarks
 * Este componente actúa como punto de entrada principal
 * de la aplicación Angular. Su plantilla solo contiene el
 * `<router-outlet />`, donde se renderiza la página de commits
 * según el sistema de rutas.
 *
 * @see app.routes.ts
 */

@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  styleUrl: './app.scss',
  imports: [RouterOutlet],
})
export class App {}