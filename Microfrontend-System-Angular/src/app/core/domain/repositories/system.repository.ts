import { Observable } from 'rxjs';
import { SystemMimeFamily, SystemFile } from '../models/system.model';

/**
 * Contrato del repositorio de archivos del sistema.
 *
 * @description
 * Esta clase abstracta define el **contrato de acceso a datos**
 * para la entidad `SystemFile` dentro del dominio.
 *
 * Forma parte de la **capa de dominio** y establece las operaciones
 * que cualquier implementación concreta debe cumplir, sin exponer
 * detalles de infraestructura (HTTP, URLs, microservicios, etc.).
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see SystemFile
 */
export abstract class SystemRepository {

  /**
   * Obtiene el listado de archivos.
   *
   * @param countFiles - Cantidad de archivos a solicitar
   * @returns Observable que emite un arreglo de archivos
   */
  abstract getAll(countFiles: number): Observable<SystemFile[]>;

  /**
   * Obtiene un archivo por su identificador.
   *
   * @param id - Identificador del archivo
   * @returns Observable que emite el archivo
   */
  abstract getById(id: string): Observable<SystemFile>;

  /**
   * Obtiene los archivos de una familia MIME.
   *
   * @param family - Familia MIME del archivo (application, audio, image, text o video)
   * @param countFiles - Cantidad de archivos a solicitar
   * @returns Observable que emite un arreglo de archivos de ese familia MIME
   */
  abstract getByMimeFamily(family: SystemMimeFamily, countFiles: number): Observable<SystemFile[]>;
}