import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InternetUser } from '../../domain/models/internet.model';
import { InternetRepository } from '../../domain/repositories/internet.repository';

/**
 * Caso de uso para recuperar el listado de usuarios de internet.
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
 * this.getAllInternetUsersUseCase.execute(10).subscribe(users => {
 *   // manejo de resultados
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see InternetRepository
 */
@Injectable()
export class GetAllInternetUsersUseCase {

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
   * @param countUsers - Cantidad de usuarios a solicitar
   * @returns Observable que emite el listado de usuarios
   */
  execute(countUsers: number): Observable<InternetUser[]> {
    return this.internetRepository.getAll(countUsers);
  }
}