import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BadgeAtom, BadgeType, ButtonAtom } from '@brejcha13320/design-system-bootstrap';
import { SystemMimeFamily, SystemFile } from '../../../core/domain/models/system.model';

/**
 * Componente de tabla de archivos del sistema.
 *
 * Muestra un listado de archivos con un badge por familia MIME
 * de correo y un botón para ver el detalle.
 *
 * @remarks
 * Recibe los archivos por el Input `files` y avisa al padre,
 * con el Output `selected`, qué archivo se quiere ver en detalle.
 * No llama a ningún servicio ni caso de uso.
 *
 * @example
 * ```html
 * <app-system-table [files]="files" (selected)="onSelect($event)"></app-system-table>
 * ```
 */
@Component({
  selector: 'app-system-table',
  templateUrl: './system-table.component.html',
  imports: [BadgeAtom, ButtonAtom],
})
export class SystemTableComponent {
  /**
   * Listado de archivos que se mostrarán en la tabla.
   */
  @Input() files: SystemFile[] = [];

  /**
   * Emite el id del archivo que se quiere ver en detalle.
   */
  @Output() selected = new EventEmitter<number>();

  /**
   * Mapeo de familias MIME de correo a tipos de Badge.
   *
   * @remarks
   * - 'image' → 'danger' (rojo)
   * - 'outlook.com' → 'primary' (azul)
   * - 'yahoo.com' → 'warning' (amarillo)
   * - 'hotmail.com' → 'info' (celeste)
   */
  familyMap: Record<SystemMimeFamily, BadgeType> = {
    'image': 'danger',
    'outlook.com': 'primary',
    'yahoo.com': 'warning',
    'hotmail.com': 'info',
  }

  /**
   * Avisa al padre qué archivo se seleccionó.
   *
   * @param idButton - Id del botón pulsado, que es el id del archivo
   */
  onSelect(idButton: string): void {
    this.selected.emit(Number(idButton));
  }
}