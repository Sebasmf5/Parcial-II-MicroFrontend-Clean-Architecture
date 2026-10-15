import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commit } from '../../../domain/models/commit.model';
import { CommitRepository } from '../../../domain/repositories/commit.repository';
import { DataService } from '../../services/data.service';

/**
 * Implementacion local del repositorio de commits.
 *
 * Usa los mocks externos para desarrollo y pruebas de interfaz.
 * No contiene reglas de negocio.
 */
@Injectable()
export class CommitLocalRepositoryImpl extends CommitRepository {
  private readonly dataService = inject(DataService);

  getAll(): Observable<Commit[]> {
    return this.dataService.getAllCommitsLocal();
  }

  getByHash(hash: string): Observable<Commit> {
    return this.dataService.getCommitByHashLocal(hash);
  }

  getByAuthorEmail(authorEmail: string): Observable<Commit[]> {
    return this.dataService.getCommitsByAuthorEmailLocal(authorEmail);
  }
}
