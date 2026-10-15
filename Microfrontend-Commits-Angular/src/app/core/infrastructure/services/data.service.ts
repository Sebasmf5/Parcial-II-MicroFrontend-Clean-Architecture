import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { mockCommits } from '../../../mocks/commits.mock';
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

  /** Obtiene todos los commits desde los mocks locales. */
  getAllCommitsLocal(): Observable<Commit[]> {
    return of([...mockCommits]);
  }

  /** Obtiene un commit por hash desde los mocks locales. */
  getCommitByHashLocal(hash: string): Observable<Commit> {
    const commit = mockCommits.find((item) => item.hash === hash);

    return commit
      ? of(commit)
      : throwError(() => new Error(`Commit not found: ${hash}`));
  }

  /** Filtra commits por correo desde los mocks locales. */
  getCommitsByAuthorEmailLocal(authorEmail: string): Observable<Commit[]> {
    return of(
      mockCommits.filter(
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
