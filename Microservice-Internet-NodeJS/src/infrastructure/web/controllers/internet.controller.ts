import { Request, Response } from "express";
import { GetAllInternetUsersUseCase } from "../../../application/usecases/get-all-internet-users.usecase";
import { GetInternetUserByIdUseCase } from "../../../application/usecases/get-internet-user-by-id.usecase";
import { GetInternetUsersByProviderUseCase } from "../../../application/usecases/get-internet-users-by-provider.usecase";
import { INTERNET_PROVIDERS, InternetProvider } from "../../../domain/models/internet.model";
import { CustomError } from "../errors/custom.error";
import { HandleError } from "../errors/handle.error";

/**
 * Controlador de usuarios de internet.
 *
 * @remarks
 * Recibe las peticiones HTTP y delega la lógica a los tres casos de uso
 * del módulo. No conoce el datasource ni el repositorio.
 */
export class InternetController {

  /**
   * Crea el controlador.
   *
   * @param getAllInternetUsersUseCase Caso de uso para obtener el listado de usuarios
   * @param getInternetUserByIdUseCase Caso de uso para obtener un usuario por id
   * @param getInternetUsersByProviderUseCase Caso de uso para obtener usuarios por proveedor
   */
  constructor(
    private getAllInternetUsersUseCase: GetAllInternetUsersUseCase,
    private getInternetUserByIdUseCase: GetInternetUserByIdUseCase,
    private getInternetUsersByProviderUseCase: GetInternetUsersByProviderUseCase,
  ){}

  /**
   * Maneja la petición HTTP para obtener un listado de usuarios.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/internet/10
   * ```
   */
  getAllUsers = (req: Request, res: Response): void => {
    const { countUsers } = req.params;

    setTimeout(() => {
      this.getAllInternetUsersUseCase
      .execute(Number(countUsers))
      .then((users) => res.status(201).json(users))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };

  /**
   * Maneja la petición HTTP para obtener un usuario por su id.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/internet/detail/5
   * ```
   */
  getUserById = (req: Request, res: Response): void => {
    const { id } = req.params;

    setTimeout(() => {
      this.getInternetUserByIdUseCase
      .execute(Number(id))
      .then((user) => res.status(201).json(user))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };

  /**
   * Maneja la petición HTTP para obtener usuarios de un proveedor.
   *
   * @remarks
   * Si el proveedor no es uno de los permitidos responde con error 400.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/internet/provider/gmail.com/10
   * ```
   */
  getUsersByProvider = (req: Request, res: Response): void => {
    const { provider, countUsers } = req.params;

    if (!INTERNET_PROVIDERS.includes(provider as InternetProvider)) {
      HandleError.error(CustomError.badRequest(`Proveedor no válido: ${provider}`), res);
      return;
    }

    setTimeout(() => {
      this.getInternetUsersByProviderUseCase
      .execute(provider as InternetProvider, Number(countUsers))
      .then((users) => res.status(201).json(users))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };
}