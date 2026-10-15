import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commit } from '../../../domain/models/commit.model';
import { CommitRepository } from '../../../domain/repositories/commit.repository';
import { DataService } from '../../services/data.service';

/**
 * Implementacion Spring Boot del repositorio de commits.
 *
 * Adapta las respuestas HTTP del microservicio al contrato del dominio.
 * No contiene reglas de negocio.
 */
@Injectable()
export class CommitSpringBootRepositoryImpl extends CommitRepository {
  private readonly dataService = inject(DataService);

  getAll(): Observable<Commit[]> {
    return this.dataService.getAllCommitsSpringBoot();
  }

  getByHash(hash: string): Observable<Commit> {
    return this.dataService.getCommitByHashSpringBoot(hash);
  }

  getByAuthorEmail(authorEmail: string): Observable<Commit[]> {
    return this.dataService.getCommitsByAuthorEmailSpringBoot(authorEmail);
  }
}
