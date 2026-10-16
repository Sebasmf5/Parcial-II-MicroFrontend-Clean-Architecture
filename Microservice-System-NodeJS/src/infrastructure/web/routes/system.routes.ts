import { Router } from "express";
import { SystemDatasource } from "../../datasources/system.datasource";
import { SystemRepositoryImpl } from "../../repositories/system.repository.impl";
import { GetAllSystemFilesUseCase } from "../../../application/usecases/get-all-system-files.usecase";
import { GetSystemFileByIdUseCase } from "../../../application/usecases/get-system-file-by-id.usecase";
import { GetSystemFilesByMimeFamilyUseCase } from "../../../application/usecases/get-system-files-by-mime-family.usecase";
import { SystemController } from "../controllers/system.controller";

/**
 * Rutas del módulo System.
 *
 * @remarks
 * Aquí se hace la composición del módulo: se crea el datasource,
 * se inyecta en la implementación del repositorio, el repositorio
 * en los tres casos de uso y los casos de uso en el controlador.
 */
export class SystemRoutes {
  static get routes(): Router {
    const router = Router();
    const repository = new SystemRepositoryImpl(new SystemDatasource());
    const getAllFiles = new GetAllSystemFilesUseCase(repository);
    const getFileById = new GetSystemFileByIdUseCase(repository);
    const getFilesByMimeFamily = new GetSystemFilesByMimeFamilyUseCase(repository);
    const controller = new SystemController(getAllFiles, getFileById, getFilesByMimeFamily);

    /**
     * @openapi
     * /api/system/{countFiles}:
     *   get:
     *     summary: Obtener listado de archivos
     *     description: Retorna una lista de archivos del sistema generados con faker.system según la cantidad solicitada.
     *     tags:
     *       - System
     *     parameters:
     *       - in: path
     *         name: countFiles
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de archivos a generar
     *     responses:
     *       201:
     *         description: Lista de archivos generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/SystemFile'
     */
    router.get("/:countFiles", controller.getAllFiles);

    /**
     * @openapi
     * /api/system/detail/{id}:
     *   get:
     *     summary: Obtener un archivo por id
     *     description: Retorna un archivo generado con el identificador solicitado.
     *     tags:
     *       - System
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 5
     *         description: Identificador del archivo
     *     responses:
     *       201:
     *         description: Archivo encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SystemFile'
     */
    router.get("/detail/:id", controller.getFileById);

    /**
     * @openapi
     * /api/system/family/{family}/{countFiles}:
     *   get:
     *     summary: Obtener archivos por familia MIME
     *     description: Retorna una lista de archivos que tienen todos el mismo familia MIME.
     *     tags:
     *       - System
     *     parameters:
     *       - in: path
     *         name: family
     *         required: true
     *         schema:
     *           type: string
     *           enum:
     *             - image
     *             - outlook.com
     *             - yahoo.com
     *             - hotmail.com
     *           example: image
     *         description: Familia MIME del archivo (application, audio, image, text o video)
     *       - in: path
     *         name: countFiles
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de archivos a generar
     *     responses:
     *       201:
     *         description: Lista de archivos del familia MIME solicitado
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/SystemFile'
     *       400:
     *         description: Proveedor no válido
     */
    router.get("/family/:family/:countFiles", controller.getFilesByMimeFamily);

    return router;
  }
}