import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commit } from '../../../domain/models/commit.model';
import { CommitRepository } from '../../../domain/repositories/commit.repository';
import { DataService } from '../../services/data.service';

/**
 * Implementación local del repositorio de commits.
 *
 * @description
 * Pertenece a la **capa de infraestructura**. Cumple el contrato
 * `CommitRepository` usando los mocks locales, por lo que sirve para
 * desarrollo y pruebas de interfaz sin necesidad del backend.
 *
 * @remarks
 * - No contiene reglas de negocio.
 * - Delega todas las operaciones en `DataService`.
 * - Se activa en `app.config.ts` con
 *   `{ provide: CommitRepository, useClass: CommitLocalRepositoryImpl }`.
 *
 * @architecture Clean Architecture
 * @layer Infrastructure
 *
 * @see CommitRepository
 * @see DataService
 */
@Injectable()
export class CommitLocalRepositoryImpl extends CommitRepository {

  /** Servicio que provee los datos locales. */
  private readonly dataService = inject(DataService);

  /**
   * Obtiene todos los commits desde los mocks locales.
   *
   * @returns {Observable<Commit[]>} Observable con todos los commits.
   */
  getAll(): Observable<Commit[]> {
    return this.dataService.getAllCommitsLocal();
  }

  /**
   * Obtiene un commit por su hash desde los mocks locales.
   *
   * @param {string} hash Identificador único del commit.
   * @returns {Observable<Commit>} Observable con el commit encontrado.
   */
  getByHash(hash: string): Observable<Commit> {
    return this.dataService.getCommitByHashLocal(hash);
  }

  /**
   * Obtiene los commits de un autor desde los mocks locales.
   *
   * @param {string} authorEmail Correo electrónico del autor.
   * @returns {Observable<Commit[]>} Observable con los commits del autor.
   */
  getByAuthorEmail(authorEmail: string): Observable<Commit[]> {
    return this.dataService.getCommitsByAuthorEmailLocal(authorEmail);
  }
}
