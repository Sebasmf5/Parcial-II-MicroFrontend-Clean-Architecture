import { Component, Input } from '@angular/core';
import { InternetUser } from '../../../core/domain/models/internet.model';

/**
 * Tarjeta con el detalle de un usuario de internet.
 *
 * @remarks
 * Solo muestra el usuario que recibe por el Input `user`.
 * No llama a ningún servicio ni caso de uso.
 *
 * @example
 * ```html
 * <app-internet-detail [user]="selectedUser"></app-internet-detail>
 * ```
 */
@Component({
  selector: 'app-internet-detail',
  templateUrl: './internet-detail.component.html',
})
export class InternetDetailComponent {
  /**
   * Usuario que se va a mostrar.
   */
  @Input({ required: true }) user!: InternetUser;
}