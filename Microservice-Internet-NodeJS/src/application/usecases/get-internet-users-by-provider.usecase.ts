import { InternetProvider, InternetUser } from "../../domain/models/internet.model";
import { InternetRepository } from "../../domain/repositories/internet.repository";

/**
 * Caso de uso para obtener los usuarios de un proveedor de correo.
 *
 * @remarks
 * Pertenece a la **capa de aplicación**. Recibe el repositorio por
 * contrato (`InternetRepository`), así que no conoce de dónde salen los datos.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
export class GetInternetUsersByProviderUseCase {

  /**
   * Crea el caso de uso.
   *
   * @param internetRepository Repositorio inyectado por contrato
   */
  constructor(private internetRepository: InternetRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @param provider Proveedor (dominio) del correo
   * @param countUsers Cantidad de usuarios a obtener
   * @returns Promesa que resuelve un arreglo de usuarios de ese proveedor
   */
  execute(provider: InternetProvider, countUsers: number): Promise<InternetUser[]> {
    return this.internetRepository.getByProvider(provider, countUsers);
  }
}