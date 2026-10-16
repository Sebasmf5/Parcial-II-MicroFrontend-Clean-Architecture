import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commit } from '../../domain/models/commit.model';
import { CommitRepository } from '../../domain/repositories/commit.repository';

/**
 * Caso de uso para filtrar commits por el correo del autor.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y recupera
 * los commits asociados a un autor a partir de su correo electrónico,
 * utilizando exclusivamente el contrato del repositorio de dominio.
 *
 * @remarks
 * - No conoce detalles de infraestructura.
 * - No valida ni normaliza el correo: esa responsabilidad queda en la
 *   fuente de datos y en la capa de presentación.
 * - Propaga los resultados y los errores al consumidor.
 *
 * @example
 * ```ts
 * this.getCommitsByAuthorEmailUseCase.execute('laura.gomez@example.com').subscribe(commits => {
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
export class GetCommitsByAuthorEmailUseCase {

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
   * @param {string} authorEmail Correo electrónico del autor.
   * @returns {Observable<Commit[]>}
   * Observable que emite los commits realizados por el autor.
   *
   * @remarks
   * Delegación directa al repositorio, sin lógica adicional.
   */
  execute(authorEmail: string): Observable<Commit[]> {
    return this.commitRepository.getByAuthorEmail(authorEmail);
  }
}
