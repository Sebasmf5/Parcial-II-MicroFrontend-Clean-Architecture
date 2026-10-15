import { InternetUser } from "../../domain/models/internet.model";
import { InternetRepository } from "../../domain/repositories/internet.repository";

/**
 * Caso de uso para obtener el listado de usuarios de internet.
 *
 * @remarks
 * Pertenece a la **capa de aplicación**. Recibe el repositorio por
 * contrato (`InternetRepository`), así que no conoce de dónde salen los datos.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
export class GetAllInternetUsersUseCase {

  /**
   * Crea el caso de uso.
   *
   * @param internetRepository Repositorio inyectado por contrato
   */
  constructor(private internetRepository: InternetRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @param countUsers Cantidad de usuarios a obtener
   * @returns Promesa que resuelve un arreglo de usuarios
   */
  execute(countUsers: number): Promise<InternetUser[]> {
    return this.internetRepository.getAll(countUsers);
  }
}