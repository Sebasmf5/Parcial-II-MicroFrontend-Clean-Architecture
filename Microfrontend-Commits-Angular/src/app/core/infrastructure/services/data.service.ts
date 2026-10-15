import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Commit } from '../../domain/models/commit.model';

/**
 * Data source de commits para la infraestructura del microfrontend.
 *
 * Provee dos origenes de datos:
 * - Mocks locales para desarrollo y pruebas de interfaz.
 * - Microservicio Spring Boot mediante HTTP.
 *
 * No contiene reglas de negocio ni debe ser consumido directamente por
 * los componentes de presentacion. Los repositorios de infraestructura
 * adaptan este servicio al contrato del dominio.
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly httpClient = inject(HttpClient);
  private readonly springBootUrl = environment.baseUrlSpringBoot;

  private readonly mockCommits: Commit[] = [
    {
      hash: '0000001',
      message: 'feat: create commit model',
      authorName: 'Laura Gomez',
      authorEmail: 'laura.gomez@example.com',
      branch: 'feature/commits',
      createdAt: '2026-10-15T10:30:00',
      files: ['src/app/core/domain/models/commit.model.ts'],
    },
    {
      hash: '0000002',
      message: 'feat: add commits repository',
      authorName: 'Carlos Perez',
      authorEmail: 'carlos.perez@example.com',
      branch: 'develop',
      createdAt: '2026-10-14T09:15:00',
      files: ['src/app/core/domain/repositories/commit.repository.ts'],
    },
    {
      hash: '0000003',
      message: 'fix: configure commit filters',
      authorName: 'Laura Gomez',
      authorEmail: 'laura.gomez@example.com',
      branch: 'fix/commit-filter',
      createdAt: '2026-10-13T14:45:00',
      files: ['src/app/core/application/usecases/get-commits-by-author-email.usecase.ts'],
    },
    {
      hash: '0000004',
      message: 'docs: update project documentation',
      authorName: 'Ana Torres',
      authorEmail: 'ana.torres@example.com',
      branch: 'main',
      createdAt: '2026-10-12T11:20:00',
      files: ['README.md'],
    },
    {
      hash: '0000005',
      message: 'chore: configure module federation',
      authorName: 'Carlos Perez',
      authorEmail: 'carlos.perez@example.com',
      branch: 'feature/commits',
      createdAt: '2026-10-11T16:10:00',
      files: ['webpack.config.js', 'angular.json'],
    },
  ];

  /** Obtiene todos los commits desde los mocks locales. */
  getAllCommitsLocal(): Observable<Commit[]> {
    return of([...this.mockCommits]);
  }

  /** Obtiene un commit por hash desde los mocks locales. */
  getCommitByHashLocal(hash: string): Observable<Commit> {
    const commit = this.mockCommits.find((item) => item.hash === hash);

    return commit
      ? of(commit)
      : throwError(() => new Error(`Commit not found: ${hash}`));
  }

  /** Filtra commits por correo desde los mocks locales. */
  getCommitsByAuthorEmailLocal(authorEmail: string): Observable<Commit[]> {
    return of(
      this.mockCommits.filter(
        (commit) => commit.authorEmail.toLowerCase() === authorEmail.toLowerCase(),
      ),
    );
  }

  /** Obtiene todos los commits desde Spring Boot. */
  getAllCommitsSpringBoot(): Observable<Commit[]> {
    return this.httpClient.get<Commit[]>(`${this.springBootUrl}/commits`);
  }

  /** Obtiene un commit por hash desde Spring Boot. */
  getCommitByHashSpringBoot(hash: string): Observable<Commit> {
    return this.httpClient.get<Commit>(`${this.springBootUrl}/commits/${encodeURIComponent(hash)}`);
  }

  /** Filtra commits por correo desde Spring Boot. */
  getCommitsByAuthorEmailSpringBoot(authorEmail: string): Observable<Commit[]> {
    return this.httpClient.get<Commit[]>(
      `${this.springBootUrl}/commits/author/${encodeURIComponent(authorEmail)}`,
    );
  }
}
