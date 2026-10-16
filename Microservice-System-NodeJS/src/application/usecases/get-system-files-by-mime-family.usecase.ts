import { SystemMimeFamily, SystemFile } from "../../domain/models/system.model";
import { SystemRepository } from "../../domain/repositories/system.repository";

/**
 * Caso de uso para obtener los archivos de una familia MIME.
 *
 * @remarks
 * Pertenece a la **capa de aplicación**. Recibe el repositorio por
 * contrato (`SystemRepository`), así que no conoce de dónde salen los datos.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
export class GetSystemFilesByMimeFamilyUseCase {

  /**
   * Crea el caso de uso.
   *
   * @param systemRepository Repositorio inyectado por contrato
   */
  constructor(private systemRepository: SystemRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @param family Familia MIME del archivo (application, audio, image, text o video)
   * @param countFiles Cantidad de archivos a obtener
   * @returns Promesa que resuelve un arreglo de archivos de ese familia MIME
   */
  execute(family: SystemMimeFamily, countFiles: number): Promise<SystemFile[]> {
    return this.systemRepository.getByMimeFamily(family, countFiles);
  }
}