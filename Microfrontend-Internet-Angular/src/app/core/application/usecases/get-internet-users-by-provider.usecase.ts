import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InternetProvider, InternetUser } from '../../domain/models/internet.model';
import { InternetRepository } from '../../domain/repositories/internet.repository';

/**
 * Caso de uso para recuperar los usuarios de un proveedor de correo.
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
 * this.getInternetUsersByProviderUseCase.execute('gmail.com', 10).subscribe(users => {
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
export class GetInternetUsersByProviderUseCase {

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
   * @param provider - Proveedor (dominio) del correo
   * @param countUsers - Cantidad de usuarios a solicitar
   * @returns Observable que emite los usuarios de ese proveedor
   */
  execute(provider: InternetProvider, countUsers: number): Observable<InternetUser[]> {
    return this.internetRepository.getByProvider(provider, countUsers);
  }
}