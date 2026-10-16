import { SystemMimeFamily, SystemFile } from "../models/system.model";

/**
 * Contrato del repositorio de archivos del sistema.
 *
 * @remarks
 * Esta clase abstracta pertenece a la **capa de dominio** y define
 * las operaciones que cualquier implementación concreta debe cumplir,
 * sin exponer detalles de infraestructura (faker, base de datos, etc.).
 *
 * @architecture Clean Architecture
 * @layer Domain
 */
export abstract class SystemRepository {
  /**
   * Obtiene un listado de archivos.
   *
   * @param countFiles Cantidad de archivos a obtener
   * @returns Promesa que resuelve un arreglo de archivos
   */
  abstract getAll(countFiles: number): Promise<SystemFile[]>;

  /**
   * Obtiene un archivo por su identificador.
   *
   * @param id Identificador del archivo
   * @returns Promesa que resuelve el archivo
   */
  abstract getById(id: string): Promise<SystemFile>;

  /**
   * Obtiene un listado de archivos de una familia MIME.
   *
   * @param family Familia MIME del archivo (application, audio, image, text o video)
   * @param countFiles Cantidad de archivos a obtener
   * @returns Promesa que resuelve un arreglo de archivos de ese familia MIME
   */
  abstract getByMimeFamily(family: SystemMimeFamily, countFiles: number): Promise<SystemFile[]>;
}