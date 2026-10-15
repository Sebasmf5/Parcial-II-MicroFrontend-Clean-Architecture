import { Observable } from 'rxjs';
import { InternetProvider, InternetUser } from '../models/internet.model';

/**
 * Contrato del repositorio de usuarios de internet.
 *
 * @description
 * Esta clase abstracta define el **contrato de acceso a datos**
 * para la entidad `InternetUser` dentro del dominio.
 *
 * Forma parte de la **capa de dominio** y establece las operaciones
 * que cualquier implementación concreta debe cumplir, sin exponer
 * detalles de infraestructura (HTTP, URLs, microservicios, etc.).
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see InternetUser
 */
export abstract class InternetRepository {

  /**
   * Obtiene el listado de usuarios.
   *
   * @param countUsers - Cantidad de usuarios a solicitar
   * @returns Observable que emite un arreglo de usuarios
   */
  abstract getAll(countUsers: number): Observable<InternetUser[]>;

  /**
   * Obtiene un usuario por su identificador.
   *
   * @param id - Identificador del usuario
   * @returns Observable que emite el usuario
   */
  abstract getById(id: number): Observable<InternetUser>;

  /**
   * Obtiene los usuarios de un proveedor de correo.
   *
   * @param provider - Proveedor (dominio) del correo
   * @param countUsers - Cantidad de usuarios a solicitar
   * @returns Observable que emite un arreglo de usuarios de ese proveedor
   */
  abstract getByProvider(provider: InternetProvider, countUsers: number): Observable<InternetUser[]>;
}