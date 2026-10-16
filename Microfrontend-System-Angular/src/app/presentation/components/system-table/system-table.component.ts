import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BadgeAtom, BadgeType, ButtonAtom } from '@brejcha13320/design-system-bootstrap';
import { SystemFile, SystemMimeFamily } from '../../../core/domain/models/system.model';
import { formatSize } from '../../utils/format-size.util';

/**
 * Componente de tabla de archivos del sistema.
 *
 * Muestra un listado de archivos con un badge por familia MIME
 * y un botón para ver el detalle.
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
   * Emite el id (UUID) del archivo que se quiere ver en detalle.
   */
  @Output() selected = new EventEmitter<string>();

  /**
   * Mapeo de familias MIME a tipos de Badge.
   *
   * @remarks
   * - 'application' → 'primary' (azul)
   * - 'audio' → 'warning' (amarillo)
   * - 'image' → 'success' (verde)
   * - 'text' → 'secondary' (gris)
   * - 'video' → 'danger' (rojo)
   */
  familyMap: Record<SystemMimeFamily, BadgeType> = {
    application: 'primary',
    audio: 'warning',
    image: 'success',
    text: 'secondary',
    video: 'danger',
  }

  /**
   * Obtiene el tipo de Badge de un tipo MIME.
   *
   * @remarks
   * Toma la familia (lo que va antes de la barra). Si la familia no está
   * en el mapa, por ejemplo `font`, devuelve 'dark'.
   *
   * @param mimeType - Tipo MIME completo, por ejemplo `image/png`
   * @returns Tipo de Badge que se debe usar
   */
  getBadgeType(mimeType: string): BadgeType {
    const family = mimeType.split('/')[0] as SystemMimeFamily;
    return this.familyMap[family] ?? 'dark';
  }

  /**
   * Convierte el tamaño del archivo (bytes) a un texto legible.
   *
   * @param bytes - Tamaño en bytes
   * @returns Texto con el tamaño y su unidad
   */
  formatSize(bytes: number): string {
    return formatSize(bytes);
  }

  /**
   * Avisa al padre qué archivo se seleccionó.
   *
   * @param idButton - Id del botón pulsado, que es el id del archivo
   */
  onSelect(idButton: string): void {
    this.selected.emit(idButton);
  }
}
