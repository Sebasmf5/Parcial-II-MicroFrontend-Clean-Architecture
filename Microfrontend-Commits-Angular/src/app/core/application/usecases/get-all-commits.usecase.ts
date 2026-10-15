import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commit } from '../../domain/models/commit.model';
import { CommitRepository } from '../../domain/repositories/commit.repository';

/**
 * Caso de uso para obtener todos los commits.
 *
 * @description
 * Recupera el historial completo de commits mediante el contrato
 * del repositorio de dominio.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
@Injectable()
export class GetAllCommitsUseCase {
  private commitRepository = inject(CommitRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @returns Observable que emite la lista de commits.
   */
  execute(): Observable<Commit[]> {
    return this.commitRepository.getAll();
  }
}
