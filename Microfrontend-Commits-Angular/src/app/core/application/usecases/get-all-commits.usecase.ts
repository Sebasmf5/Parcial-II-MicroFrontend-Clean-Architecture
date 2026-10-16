import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commit } from '../../domain/models/commit.model';
import { CommitRepository } from '../../domain/repositories/commit.repository';

/**
 * Caso de uso para obtener el historial completo de commits.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y representa
 * una acción del sistema orientada al negocio: recuperar todos los
 * commits disponibles.
 *
 * Actúa como intermediario entre la capa de presentación y el dominio,
 * delegando la obtención de datos al contrato `CommitRepository`.
 *
 * @remarks
 * - No conoce detalles de infraestructura (HTTP, mocks, URLs).
 * - No transforma los datos para la interfaz.
 * - Propaga los resultados y los errores al consumidor.
 *
 * La dependencia se resuelve mediante **inyección por contrato**
 * utilizando la función `inject()` de Angular.
 *
 * @example
 * ```ts
 * this.getAllCommitsUseCase.execute().subscribe(commits => {
 *   // manejo de resultados
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Commit
 * @see CommitRepository
 */
@Injectable()
export class GetAllCommitsUseCase {

  /**
   * Repositorio de commits inyectado por contrato.
   *
   * @remarks
   * La implementación concreta (local o Spring Boot) se define
   * en la capa de infraestructura, dentro de `app.config.ts`.
   */
  private commitRepository = inject(CommitRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @returns {Observable<Commit[]>}
   * Observable que emite el listado completo de commits del dominio.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - No contiene lógica de presentación.
   * - Mantiene el principio de responsabilidad única.
   */
  execute(): Observable<Commit[]> {
    return this.commitRepository.getAll();
  }
}
