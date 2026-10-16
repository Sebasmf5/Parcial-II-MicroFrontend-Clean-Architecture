import { SystemMimeFamily, SystemFile } from "../../domain/models/system.model";
import { SystemRepository } from "../../domain/repositories/system.repository";
import { SystemDatasource } from "../datasources/system.datasource";

/**
 * Implementación concreta del repositorio de archivos del sistema.
 *
 * @remarks
 * Pertenece a la **capa de infraestructura**. Cumple el contrato
 * `SystemRepository` y delega la obtención de datos al `SystemDatasource`.
 */
export class SystemRepositoryImpl extends SystemRepository {

  /**
   * Crea el repositorio.
   *
   * @param datasource Datasource que genera los archivos
   */
  constructor(private datasource: SystemDatasource) {
    super();
  }

  /**
   * Obtiene un listado de archivos.
   *
   * @param countFiles Cantidad de archivos a obtener
   * @returns Promesa que resuelve un arreglo de archivos
   */
  getAll(countFiles: number): Promise<SystemFile[]> {
    return this.datasource.getAll(countFiles);
  }

  /**
   * Obtiene un archivo por su identificador.
   *
   * @param id Identificador del archivo
   * @returns Promesa que resuelve el archivo
   */
  getById(id: string): Promise<SystemFile> {
    return this.datasource.getById(id);
  }

  /**
   * Obtiene un listado de archivos de una familia MIME.
   *
   * @param family Familia MIME del archivo (application, audio, image, text o video)
   * @param countFiles Cantidad de archivos a obtener
   * @returns Promesa que resuelve un arreglo de archivos de ese familia MIME
   */
  getByMimeFamily(family: SystemMimeFamily, countFiles: number): Promise<SystemFile[]> {
    return this.datasource.getByMimeFamily(family, countFiles);
  }
}