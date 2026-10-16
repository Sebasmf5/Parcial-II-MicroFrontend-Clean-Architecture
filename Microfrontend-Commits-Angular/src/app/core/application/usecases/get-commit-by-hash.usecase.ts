import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commit } from '../../domain/models/commit.model';
import { CommitRepository } from '../../domain/repositories/commit.repository';

/**
 * Caso de uso para obtener un commit por su hash.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y consulta
 * un commit específico a través del repositorio de dominio, sin
 * conocer cuál es la fuente de datos.
 *
 * @remarks
 * - No conoce detalles de infraestructura.
 * - Si el commit no existe, el error lo emite la implementación del
 *   repositorio y este caso de uso lo propaga sin modificarlo.
 *
 * @example
 * ```ts
 * this.getCommitByHashUseCase.execute('0000001').subscribe(commit => {
 *   // manejo del commit encontrado
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
export class GetCommitByHashUseCase {

  /**
   * Repositorio de commits inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private commitRepository = inject(CommitRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param {string} hash Identificador único del commit.
   * @returns {Observable<Commit>}
   * Observable que emite el commit encontrado.
   *
   * @remarks
   * Delegación directa al repositorio, sin lógica adicional.
   */
  execute(hash: string): Observable<Commit> {
    return this.commitRepository.getByHash(hash);
  }
}
