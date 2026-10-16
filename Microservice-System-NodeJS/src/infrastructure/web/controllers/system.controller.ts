import { Request, Response } from "express";
import { GetAllSystemFilesUseCase } from "../../../application/usecases/get-all-system-files.usecase";
import { GetSystemFileByIdUseCase } from "../../../application/usecases/get-system-file-by-id.usecase";
import { GetSystemFilesByMimeFamilyUseCase } from "../../../application/usecases/get-system-files-by-mime-family.usecase";
import { SYSTEM_MIME_FAMILIES, SystemMimeFamily } from "../../../domain/models/system.model";
import { CustomError } from "../errors/custom.error";
import { HandleError } from "../errors/handle.error";

/**
 * Controlador de archivos del sistema.
 *
 * @remarks
 * Recibe las peticiones HTTP y delega la lógica a los tres casos de uso
 * del módulo. No conoce el datasource ni el repositorio.
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
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/system/10
   * ```
   */
  getAllFiles = (req: Request, res: Response): void => {
    const { countFiles } = req.params;

    setTimeout(() => {
      this.getAllSystemFilesUseCase
      .execute(Number(countFiles))
      .then((files) => res.status(201).json(files))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };

  /**
   * Maneja la petición HTTP para obtener un archivo por su id.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/system/detail/5
   * ```
   */
  getFileById = (req: Request, res: Response): void => {
    const { id } = req.params;

    setTimeout(() => {
      this.getSystemFileByIdUseCase
      .execute(Number(id))
      .then((file) => res.status(201).json(file))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };

  /**
   * Maneja la petición HTTP para obtener archivos de una familia MIME.
   *
   * @remarks
   * Si el familia MIME no es uno de los permitidos responde con error 400.
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
    const { family, countFiles } = req.params;

    if (!SYSTEM_MIME_FAMILIES.includes(family as SystemMimeFamily)) {
      HandleError.error(CustomError.badRequest(`Proveedor no válido: ${family}`), res);
      return;
    }

    setTimeout(() => {
      this.getSystemFilesByMimeFamilyUseCase
      .execute(family as SystemMimeFamily, Number(countFiles))
      .then((files) => res.status(201).json(files))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };
}