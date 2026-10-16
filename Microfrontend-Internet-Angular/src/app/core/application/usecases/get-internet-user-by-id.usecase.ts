import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InternetUser } from '../../domain/models/internet.model';
import { InternetRepository } from '../../domain/repositories/internet.repository';

/**
 * Caso de uso para recuperar el detalle de un usuario de internet.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y actúa
 * como intermediario entre la capa de presentación y el dominio,
 * delegando la obtención de datos al contrato `InternetRepository`.
 *
 * @remarks
 * - No conoce detalles de infraestructura (HTTP, URLs, puertos).
 * - No transforma los datos para la UI.
 * - Propaga los resultados y errores al consumidor.
 *
 * @example
 * ```ts
 * this.getInternetUserByIdUseCase.execute(5).subscribe(user => {
 *   // manejo del resultado
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see InternetRepository
 */
@Injectable()
export class GetInternetUserByIdUseCase {

  /**
   * Repositorio de usuarios inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en `internet.providers.ts`.
   */
  private internetRepository = inject(InternetRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param id - Identificador del usuario
   * @returns Observable que emite el usuario
   */
  execute(id: number): Observable<InternetUser> {
    return this.internetRepository.getById(id);
  }
}