import { Component, Input } from '@angular/core';
import { SystemFile } from '../../../core/domain/models/system.model';
import { formatSize } from '../../utils/format-size.util';

/**
 * Tarjeta con el detalle de un archivo del sistema.
 *
 * @remarks
 * Solo muestra el archivo que recibe por el Input `file`.
 * No llama a ningún servicio ni caso de uso.
 *
 * @example
 * ```html
 * <app-system-detail [file]="selectedFile"></app-system-detail>
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

  /**
   * Convierte el tamaño del archivo (bytes) a un texto legible.
   *
   * @param bytes - Tamaño en bytes
   * @returns Texto con el tamaño y su unidad
   */
  formatSize(bytes: number): string {
    return formatSize(bytes);
  }
}
