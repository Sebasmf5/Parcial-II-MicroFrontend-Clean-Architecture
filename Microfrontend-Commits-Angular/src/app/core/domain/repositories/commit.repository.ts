import { Observable } from 'rxjs';
import { Commit } from '../models/commit.model';

/**
 * Contrato del repositorio de commits.
 *
 * @description
 * Define las operaciones de acceso a datos para la entidad `Commit`
 * dentro de la capa de dominio. La implementacion concreta puede usar
 * HTTP, datos locales o mocks sin afectar los casos de uso.
 *
 * @remarks
 * Este contrato no conoce URLs, HttpClient ni detalles de infraestructura.
 * Los errores se propagan al consumidor para que sean manejados por la
 * capa correspondiente.
 *
 * @architecture Clean Architecture
 * @layer Domain
 */
export abstract class CommitRepository {

  /**
   * Obtiene todos los commits disponibles.
   *
   * @returns Observable que emite la lista de commits.
   */
  abstract getAll(): Observable<Commit[]>;

  /**
   * Obtiene un commit por su hash.
   *
   * @param hash Identificador unico del commit.
   * @returns Observable que emite el commit encontrado.
   */
  abstract getByHash(hash: string): Observable<Commit>;

  /**
   * Obtiene los commits realizados por un autor.
   *
   * @param authorEmail Correo electronico del autor.
   * @returns Observable que emite los commits del autor.
   */
  abstract getByAuthorEmail(authorEmail: string): Observable<Commit[]>;
}
