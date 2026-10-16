import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz del Microfrontend de Internet.
 *
 * @remarks
 * Solo se usa cuando el microfrontend se abre solo (puerto 4201).
 * Dentro del Host no se carga: el Host trae directamente `InternetPage`.
 */
@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  styleUrl: './app.scss',
  imports: [RouterOutlet],
})
export class App { }