import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz del Microfrontend de System.
 *
 * @remarks
 * Solo se usa cuando el microfrontend se abre solo (puerto 4203).
 * Dentro del Host no se carga: el Host trae directamente `SystemPage`.
 */
@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  styleUrl: './app.scss',
  imports: [RouterOutlet],
})
export class App { }