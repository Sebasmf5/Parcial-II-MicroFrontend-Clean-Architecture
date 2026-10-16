import { SystemFile } from "../../domain/models/system.model";
import { SystemRepository } from "../../domain/repositories/system.repository";

/**
 * Caso de uso para obtener el listado de archivos del sistema.
 *
 * @remarks
 * Pertenece a la **capa de aplicación**. Recibe el repositorio por
 * contrato (`SystemRepository`), así que no conoce de dónde salen los datos.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
export class GetAllSystemFilesUseCase {

  /**
   * Crea el caso de uso.
   *
   * @param systemRepository Repositorio inyectado por contrato
   */
  constructor(private systemRepository: SystemRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @param countFiles Cantidad de archivos a obtener
   * @returns Promesa que resuelve un arreglo de archivos
   */
  execute(countFiles: number): Promise<SystemFile[]> {
    return this.systemRepository.getAll(countFiles);
  }
}