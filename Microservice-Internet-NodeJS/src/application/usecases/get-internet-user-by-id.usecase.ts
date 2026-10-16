import { InternetUser } from "../../domain/models/internet.model";
import { InternetRepository } from "../../domain/repositories/internet.repository";

/**
 * Caso de uso para obtener un usuario de internet por su identificador.
 *
 * @remarks
 * Pertenece a la **capa de aplicación**. Recibe el repositorio por
 * contrato (`InternetRepository`), así que no conoce de dónde salen los datos.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
export class GetInternetUserByIdUseCase {

  /**
   * Crea el caso de uso.
   *
   * @param internetRepository Repositorio inyectado por contrato
   */
  constructor(private internetRepository: InternetRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @param id Identificador del usuario
   * @returns Promesa que resuelve el usuario
   */
  execute(id: number): Promise<InternetUser> {
    return this.internetRepository.getById(id);
  }
}