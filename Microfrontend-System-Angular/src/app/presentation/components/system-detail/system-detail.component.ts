import { Component, Input } from '@angular/core';
import { SystemFile } from '../../../core/domain/models/system.model';

/**
 * Tarjeta con el detalle de un archivo del sistema.
 *
 * @remarks
 * Solo muestra el archivo que recibe por el Input `file`.
 * No llama a ningún servicio ni caso de uso.
 *
 * @example
 * ```html
 * <app-system-detail [file]="selectedUser"></app-system-detail>
 * ```
 */
@Component({
  selector: 'app-system-detail',
  templateUrl: './system-detail.component.html',
})
export class SystemDetailComponent {
  /**
   * Archivo que se va a mostrar.
   */
  @Input({ required: true }) file!: SystemFile;
}