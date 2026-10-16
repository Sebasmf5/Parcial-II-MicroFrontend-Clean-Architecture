import { Router } from "express";
import { InternetDatasource } from "../../datasources/internet.datasource";
import { InternetRepositoryImpl } from "../../repositories/internet.repository.impl";
import { GetAllInternetUsersUseCase } from "../../../application/usecases/get-all-internet-users.usecase";
import { GetInternetUserByIdUseCase } from "../../../application/usecases/get-internet-user-by-id.usecase";
import { GetInternetUsersByProviderUseCase } from "../../../application/usecases/get-internet-users-by-provider.usecase";
import { InternetController } from "../controllers/internet.controller";

/**
 * Rutas del módulo Internet.
 *
 * @remarks
 * Aquí se hace la composición del módulo: se crea el datasource,
 * se inyecta en la implementación del repositorio, el repositorio
 * en los tres casos de uso y los casos de uso en el controlador.
 */
export class InternetRoutes {
  static get routes(): Router {
    const router = Router();
    const repository = new InternetRepositoryImpl(new InternetDatasource());
    const getAllUsers = new GetAllInternetUsersUseCase(repository);
    const getUserById = new GetInternetUserByIdUseCase(repository);
    const getUsersByProvider = new GetInternetUsersByProviderUseCase(repository);
    const controller = new InternetController(getAllUsers, getUserById, getUsersByProvider);

    /**
     * @openapi
     * /api/internet/{countUsers}:
     *   get:
     *     summary: Obtener listado de usuarios
     *     description: Retorna una lista de usuarios de internet generados con faker.internet según la cantidad solicitada.
     *     tags:
     *       - Internet
     *     parameters:
     *       - in: path
     *         name: countUsers
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de usuarios a generar
     *     responses:
     *       201:
     *         description: Lista de usuarios generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/InternetUser'
     */
    router.get("/:countUsers", controller.getAllUsers);

    /**
     * @openapi
     * /api/internet/detail/{id}:
     *   get:
     *     summary: Obtener un usuario por id
     *     description: Retorna un usuario generado con el identificador solicitado.
     *     tags:
     *       - Internet
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 5
     *         description: Identificador del usuario
     *     responses:
     *       201:
     *         description: Usuario encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/InternetUser'
     */
    router.get("/detail/:id", controller.getUserById);

    /**
     * @openapi
     * /api/internet/provider/{provider}/{countUsers}:
     *   get:
     *     summary: Obtener usuarios por proveedor de correo
     *     description: Retorna una lista de usuarios que tienen todos el mismo proveedor de correo.
     *     tags:
     *       - Internet
     *     parameters:
     *       - in: path
     *         name: provider
     *         required: true
     *         schema:
     *           type: string
     *           enum:
     *             - gmail.com
     *             - outlook.com
     *             - yahoo.com
     *             - hotmail.com
     *           example: gmail.com
     *         description: Proveedor (dominio) del correo
     *       - in: path
     *         name: countUsers
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de usuarios a generar
     *     responses:
     *       201:
     *         description: Lista de usuarios del proveedor solicitado
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/InternetUser'
     *       400:
     *         description: Proveedor no válido
     */
    router.get("/provider/:provider/:countUsers", controller.getUsersByProvider);

    return router;
  }
}