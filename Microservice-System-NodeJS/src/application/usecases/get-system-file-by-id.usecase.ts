import { SystemFile } from "../../domain/models/system.model";
import { SystemRepository } from "../../domain/repositories/system.repository";

/**
 * Caso de uso para obtener un archivo del sistema por su identificador.
 *
 * @remarks
 * Pertenece a la **capa de aplicación**. Recibe el repositorio por
 * contrato (`SystemRepository`), así que no conoce de dónde salen los datos.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
export class GetSystemFileByIdUseCase {

  /**
   * Crea el caso de uso.
   *
   * @param systemRepository Repositorio inyectado por contrato
   */
  constructor(private systemRepository: SystemRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @param id Identificador del archivo
   * @returns Promesa que resuelve el archivo
   */
  execute(id: string): Promise<SystemFile> {
    return this.systemRepository.getById(id);
  }
}