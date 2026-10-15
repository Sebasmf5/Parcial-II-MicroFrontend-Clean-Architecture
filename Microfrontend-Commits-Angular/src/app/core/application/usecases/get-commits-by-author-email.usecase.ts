import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commit } from '../../domain/models/commit.model';
import { CommitRepository } from '../../domain/repositories/commit.repository';

/**
 * Caso de uso para filtrar commits por correo del autor.
 *
 * @description
 * Recupera los commits asociados a un autor mediante su correo,
 * utilizando exclusivamente el contrato del repositorio de dominio.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
@Injectable()
export class GetCommitsByAuthorEmailUseCase {
  private commitRepository = inject(CommitRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param authorEmail Correo electronico del autor.
   * @returns Observable que emite los commits del autor.
   */
  execute(authorEmail: string): Observable<Commit[]> {
    return this.commitRepository.getByAuthorEmail(authorEmail);
  }
}
