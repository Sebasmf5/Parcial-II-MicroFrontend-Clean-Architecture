import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { mockCommits } from '../../../mocks/commits.mock';
import { Commit } from '../../domain/models/commit.model';

/**
 * Fuente de datos de commits para la infraestructura del microfrontend.
 *
 * @description
 * Pertenece a la **capa de infraestructura** y provee dos orígenes de datos:
 * - Mocks locales, para desarrollo y pruebas de interfaz.
 * - Microservicio Spring Boot, mediante HTTP.
 *
 * @remarks
 * - No contiene reglas de negocio.
 * - Los componentes de presentación no deben consumirlo directamente:
 *   los repositorios de infraestructura lo adaptan al contrato del dominio.
 * - La URL base del microservicio se toma de `environment.baseUrlSpringBoot`.
 *
 * @example
 * ```ts
 * private readonly dataService = inject(DataService);
 *
 * this.dataService.getAllCommitsLocal().subscribe(commits => {
 *   // manejo de resultados
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Infrastructure
 *
 * @see CommitLocalRepositoryImpl
 * @see CommitSpringBootRepositoryImpl
 */
@Injectable({ providedIn: 'root' })
export class DataService {

  /** Cliente HTTP de Angular usado para consumir el microservicio. */
  private readonly httpClient = inject(HttpClient);

  /** URL base del microservicio Spring Boot. */
  private readonly springBootUrl = environment.baseUrlSpringBoot;

  /**
   * Obtiene todos los commits desde los mocks locales.
   *
   * @returns {Observable<Commit[]>}
   * Observable que emite una copia del listado de mocks, para que quien
   * lo consuma no modifique el arreglo original.
   */
  getAllCommitsLocal(): Observable<Commit[]> {
    return of([...mockCommits]);
  }

  /**
   * Obtiene un commit por su hash desde los mocks locales.
   *
   * @param {string} hash Identificador único del commit.
   * @returns {Observable<Commit>}
   * Observable que emite el commit encontrado o, si no existe,
   * un error con el mensaje `Commit not found: <hash>`.
   */
  getCommitByHashLocal(hash: string): Observable<Commit> {
    const commit = mockCommits.find((item) => item.hash === hash);

    return commit
      ? of(commit)
      : throwError(() => new Error(`Commit not found: ${hash}`));
  }

  /**
   * Filtra los commits por correo del autor desde los mocks locales.
   *
   * @param {string} authorEmail Correo electrónico del autor.
   * @returns {Observable<Commit[]>}
   * Observable que emite los commits del autor. La comparación no
   * distingue entre mayúsculas y minúsculas.
   */
  getCommitsByAuthorEmailLocal(authorEmail: string): Observable<Commit[]> {
    return of(
      mockCommits.filter(
        (commit) => commit.authorEmail.toLowerCase() === authorEmail.toLowerCase(),
      ),
    );
  }

  /**
   * Obtiene todos los commits desde Spring Boot.
   *
   * @returns {Observable<Commit[]>}
   * Observable con la respuesta de `GET /commits`.
   */
  getAllCommitsSpringBoot(): Observable<Commit[]> {
    return this.httpClient.get<Commit[]>(`${this.springBootUrl}/commits`);
  }

  /**
   * Obtiene un commit por su hash desde Spring Boot.
   *
   * @param {string} hash Identificador único del commit.
   * @returns {Observable<Commit>}
   * Observable con la respuesta de `GET /commits/{hash}`. El hash se
   * codifica con `encodeURIComponent` antes de armar la URL.
   */
  getCommitByHashSpringBoot(hash: string): Observable<Commit> {
    return this.httpClient.get<Commit>(`${this.springBootUrl}/commits/${encodeURIComponent(hash)}`);
  }

  /**
   * Filtra los commits por correo del autor desde Spring Boot.
   *
   * @param {string} authorEmail Correo electrónico del autor.
   * @returns {Observable<Commit[]>}
   * Observable con la respuesta de `GET /commits/author/{authorEmail}`.
   * El correo se codifica con `encodeURIComponent` antes de armar la URL.
   */
  getCommitsByAuthorEmailSpringBoot(authorEmail: string): Observable<Commit[]> {
    return this.httpClient.get<Commit[]>(
      `${this.springBootUrl}/commits/author/${encodeURIComponent(authorEmail)}`,
    );
  }
}
