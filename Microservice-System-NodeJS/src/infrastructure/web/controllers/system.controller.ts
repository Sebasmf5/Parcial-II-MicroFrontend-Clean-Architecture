import { Request, Response } from "express";
import { GetAllSystemFilesUseCase } from "../../../application/usecases/get-all-system-files.usecase";
import { GetSystemFileByIdUseCase } from "../../../application/usecases/get-system-file-by-id.usecase";
import { GetSystemFilesByMimeFamilyUseCase } from "../../../application/usecases/get-system-files-by-mime-family.usecase";
import { SYSTEM_MIME_FAMILIES, SystemMimeFamily } from "../../../domain/models/system.model";
import { CustomError } from "../errors/custom.error";
import { HandleError } from "../errors/handle.error";

/**
 * Expresión regular de un UUID (el formato de los ids de los archivos).
 */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Controlador de archivos del sistema.
 *
 * @remarks
 * Recibe las peticiones HTTP, valida los parámetros y delega la lógica
 * a los tres casos de uso del módulo. No conoce el datasource ni el repositorio.
 */
export class SystemController {

  /**
   * Crea el controlador.
   *
   * @param getAllSystemFilesUseCase Caso de uso para obtener el listado de archivos
   * @param getSystemFileByIdUseCase Caso de uso para obtener un archivo por id
   * @param getSystemFilesByMimeFamilyUseCase Caso de uso para obtener archivos por familia MIME
   */
  constructor(
    private getAllSystemFilesUseCase: GetAllSystemFilesUseCase,
    private getSystemFileByIdUseCase: GetSystemFileByIdUseCase,
    private getSystemFilesByMimeFamilyUseCase: GetSystemFilesByMimeFamilyUseCase,
  ){}

  /**
   * Maneja la petición HTTP para obtener un listado de archivos.
   *
   * @remarks
   * Si `countFiles` no es un entero mayor que 0 responde con error 400.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/system/10
   * ```
   */
  getAllFiles = (req: Request, res: Response): void => {
    const countFiles = this.parseCount(req.params.countFiles);

    if (countFiles === null) {
      HandleError.error(CustomError.badRequest(`Cantidad no válida: ${String(req.params.countFiles)}`), res);
      return;
    }

    setTimeout(() => {
      this.getAllSystemFilesUseCase
      .execute(countFiles)
      .then((files) => res.status(200).json(files))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };

  /**
   * Maneja la petición HTTP para obtener un archivo por su id.
   *
   * @remarks
   * Si el id no es un UUID responde con error 400. Si no existe
   * un archivo con ese id responde con error 404.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/system/detail/9b2d6f7e-3c1a-4f5b-8a60-1d2e3f4a5b6c
   * ```
   */
  getFileById = (req: Request, res: Response): void => {
    const id = String(req.params.id);

    if (!UUID_REGEX.test(id)) {
      HandleError.error(CustomError.badRequest(`Id no válido (debe ser un UUID): ${id}`), res);
      return;
    }

    setTimeout(() => {
      this.getSystemFileByIdUseCase
      .execute(id)
      .then((file) => res.status(200).json(file))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };

  /**
   * Maneja la petición HTTP para obtener archivos de una familia MIME.
   *
   * @remarks
   * Si la familia no es una de las permitidas, o si `countFiles` no es
   * un entero mayor que 0, responde con error 400.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/system/family/image/10
   * ```
   */
  getFilesByMimeFamily = (req: Request, res: Response): void => {
    const family = String(req.params.family);
    const countFiles = this.parseCount(req.params.countFiles);

    if (!SYSTEM_MIME_FAMILIES.includes(family as SystemMimeFamily)) {
      HandleError.error(CustomError.badRequest(`Familia MIME no válida: ${family}`), res);
      return;
    }

    if (countFiles === null) {
      HandleError.error(CustomError.badRequest(`Cantidad no válida: ${String(req.params.countFiles)}`), res);
      return;
    }

    setTimeout(() => {
      this.getSystemFilesByMimeFamilyUseCase
      .execute(family as SystemMimeFamily, countFiles)
      .then((files) => res.status(200).json(files))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };

  /**
   * Convierte el texto de la URL en una cantidad válida.
   *
   * @param value Valor recibido en la URL
   * @returns El número entero mayor que 0, o `null` si no es válido
   */
  private parseCount(value: unknown): number | null {
    const count = Number(value);
    return Number.isInteger(count) && count > 0 ? count : null;
  }
}
