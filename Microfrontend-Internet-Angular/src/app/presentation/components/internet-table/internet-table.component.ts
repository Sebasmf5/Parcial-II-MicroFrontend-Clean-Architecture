import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BadgeAtom, BadgeType, ButtonAtom } from '@brejcha13320/design-system-bootstrap';
import { InternetProvider, InternetUser } from '../../../core/domain/models/internet.model';

/**
 * Componente de tabla de usuarios de internet.
 *
 * Muestra un listado de usuarios con un badge por proveedor
 * de correo y un botón para ver el detalle.
 *
 * @remarks
 * Recibe los usuarios por el Input `users` y avisa al padre,
 * con el Output `selected`, qué usuario se quiere ver en detalle.
 * No llama a ningún servicio ni caso de uso.
 *
 * @example
 * ```html
 * <app-internet-table [users]="users" (selected)="onSelect($event)"></app-internet-table>
 * ```
 */
@Component({
  selector: 'app-internet-table',
  templateUrl: './internet-table.component.html',
  imports: [BadgeAtom, ButtonAtom],
})
export class InternetTableComponent {
  /**
   * Listado de usuarios que se mostrarán en la tabla.
   */
  @Input() users: InternetUser[] = [];

  /**
   * Emite el id del usuario que se quiere ver en detalle.
   */
  @Output() selected = new EventEmitter<number>();

  /**
   * Mapeo de proveedores de correo a tipos de Badge.
   *
   * @remarks
   * - 'gmail.com' → 'danger' (rojo)
   * - 'outlook.com' → 'primary' (azul)
   * - 'yahoo.com' → 'warning' (amarillo)
   * - 'hotmail.com' → 'info' (celeste)
   */
  providerMap: Record<InternetProvider, BadgeType> = {
    'gmail.com': 'danger',
    'outlook.com': 'primary',
    'yahoo.com': 'warning',
    'hotmail.com': 'info',
  }

  /**
   * Avisa al padre qué usuario se seleccionó.
   *
   * @param idButton - Id del botón pulsado, que es el id del usuario
   */
  onSelect(idButton: string): void {
    this.selected.emit(Number(idButton));
  }
}