import { InternetProvider, InternetUser } from "../../domain/models/internet.model";
import { InternetRepository } from "../../domain/repositories/internet.repository";
import { InternetDatasource } from "../datasources/internet.datasource";

/**
 * Implementación concreta del repositorio de usuarios de internet.
 *
 * @remarks
 * Pertenece a la **capa de infraestructura**. Cumple el contrato
 * `InternetRepository` y delega la obtención de datos al `InternetDatasource`.
 */
export class InternetRepositoryImpl extends InternetRepository {

  /**
   * Crea el repositorio.
   *
   * @param datasource Datasource que genera los usuarios
   */
  constructor(private datasource: InternetDatasource) {
    super();
  }

  /**
   * Obtiene un listado de usuarios.
   *
   * @param countUsers Cantidad de usuarios a obtener
   * @returns Promesa que resuelve un arreglo de usuarios
   */
  getAll(countUsers: number): Promise<InternetUser[]> {
    return this.datasource.getAll(countUsers);
  }

  /**
   * Obtiene un usuario por su identificador.
   *
   * @param id Identificador del usuario
   * @returns Promesa que resuelve el usuario
   */
  getById(id: number): Promise<InternetUser> {
    return this.datasource.getById(id);
  }

  /**
   * Obtiene un listado de usuarios de un proveedor de correo.
   *
   * @param provider Proveedor (dominio) del correo
   * @param countUsers Cantidad de usuarios a obtener
   * @returns Promesa que resuelve un arreglo de usuarios de ese proveedor
   */
  getByProvider(provider: InternetProvider, countUsers: number): Promise<InternetUser[]> {
    return this.datasource.getByProvider(provider, countUsers);
  }
}