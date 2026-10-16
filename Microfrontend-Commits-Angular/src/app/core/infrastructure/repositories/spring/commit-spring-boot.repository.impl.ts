import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commit } from '../../../domain/models/commit.model';
import { CommitRepository } from '../../../domain/repositories/commit.repository';
import { DataService } from '../../services/data.service';

/**
 * Implementación Spring Boot del repositorio de commits.
 *
 * @description
 * Pertenece a la **capa de infraestructura**. Cumple el contrato
 * `CommitRepository` consumiendo el microservicio de Spring Boot
 * mediante HTTP.
 *
 * @remarks
 * - No contiene reglas de negocio.
 * - Delega todas las operaciones en `DataService`.
 * - Se activa en `app.config.ts` con
 *   `{ provide: CommitRepository, useClass: CommitSpringBootRepositoryImpl }`.
 *
 * @architecture Clean Architecture
 * @layer Infrastructure
 *
 * @see CommitRepository
 * @see DataService
 */
@Injectable()
export class CommitSpringBootRepositoryImpl extends CommitRepository {

  /** Servicio que realiza las peticiones HTTP al microservicio. */
  private readonly dataService = inject(DataService);

  /**
   * Obtiene todos los commits desde Spring Boot.
   *
   * @returns {Observable<Commit[]>} Observable con todos los commits.
   */
  getAll(): Observable<Commit[]> {
    return this.dataService.getAllCommitsSpringBoot();
  }

  /**
   * Obtiene un commit por su hash desde Spring Boot.
   *
   * @param {string} hash Identificador único del commit.
   * @returns {Observable<Commit>} Observable con el commit encontrado.
   */
  getByHash(hash: string): Observable<Commit> {
    return this.dataService.getCommitByHashSpringBoot(hash);
  }

  /**
   * Obtiene los commits de un autor desde Spring Boot.
   *
   * @param {string} authorEmail Correo electrónico del autor.
   * @returns {Observable<Commit[]>} Observable con los commits del autor.
   */
  getByAuthorEmail(authorEmail: string): Observable<Commit[]> {
    return this.dataService.getCommitsByAuthorEmailSpringBoot(authorEmail);
  }
}
