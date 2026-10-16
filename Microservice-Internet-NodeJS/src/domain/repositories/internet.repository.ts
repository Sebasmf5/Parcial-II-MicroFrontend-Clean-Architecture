import { InternetProvider, InternetUser } from "../models/internet.model";

/**
 * Contrato del repositorio de usuarios de internet.
 *
 * @remarks
 * Esta clase abstracta pertenece a la **capa de dominio** y define
 * las operaciones que cualquier implementación concreta debe cumplir,
 * sin exponer detalles de infraestructura (faker, base de datos, etc.).
 *
 * @architecture Clean Architecture
 * @layer Domain
 */
export abstract class InternetRepository {
  /**
   * Obtiene un listado de usuarios.
   *
   * @param countUsers Cantidad de usuarios a obtener
   * @returns Promesa que resuelve un arreglo de usuarios
   */
  abstract getAll(countUsers: number): Promise<InternetUser[]>;

  /**
   * Obtiene un usuario por su identificador.
   *
   * @param id Identificador del usuario
   * @returns Promesa que resuelve el usuario
   */
  abstract getById(id: number): Promise<InternetUser>;

  /**
   * Obtiene un listado de usuarios de un proveedor de correo.
   *
   * @param provider Proveedor (dominio) del correo
   * @param countUsers Cantidad de usuarios a obtener
   * @returns Promesa que resuelve un arreglo de usuarios de ese proveedor
   */
  abstract getByProvider(provider: InternetProvider, countUsers: number): Promise<InternetUser[]>;
}