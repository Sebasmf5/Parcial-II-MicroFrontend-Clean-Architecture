import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commit } from '../../domain/models/commit.model';
import { CommitRepository } from '../../domain/repositories/commit.repository';

/**
 * Caso de uso para obtener un commit por su hash.
 *
 * @description
 * Consulta un commit especifico utilizando el repositorio
 * de dominio, sin conocer la fuente de datos.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
@Injectable()
export class GetCommitByHashUseCase {
  private commitRepository = inject(CommitRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param hash Identificador unico del commit.
   * @returns Observable que emite el commit encontrado.
   */
  execute(hash: string): Observable<Commit> {
    return this.commitRepository.getByHash(hash);
  }
}
