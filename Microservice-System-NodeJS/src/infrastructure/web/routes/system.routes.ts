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
     *         description: Cantidad de archivos a devolver
     *     responses:
     *       200:
     *         description: Lista de archivos
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/SystemFile'
     *       400:
     *         description: Cantidad no válida
     */
    router.get("/:countFiles", controller.getAllFiles);

    /**
     * @openapi
     * /api/system/detail/{id}:
     *   get:
     *     summary: Obtener un archivo por id
     *     description: Retorna el archivo que tiene el identificador (UUID) solicitado.
     *     tags:
     *       - System
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *           example: 9b2d6f7e-3c1a-4f5b-8a60-1d2e3f4a5b6c
     *         description: Identificador (UUID) del archivo. Se puede copiar de la respuesta del listado.
     *     responses:
     *       200:
     *         description: Archivo encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SystemFile'
     *       400:
     *         description: El id no es un UUID válido
     *       404:
     *         description: No existe un archivo con ese id
     */
    router.get("/detail/:id", controller.getFileById);

    /**
     * @openapi
     * /api/system/family/{family}/{countFiles}:
     *   get:
     *     summary: Obtener archivos por familia MIME
     *     description: Retorna una lista de archivos cuyo tipo MIME es de la familia indicada (por ejemplo image/png es de la familia image).
     *     tags:
     *       - System
     *     parameters:
     *       - in: path
     *         name: family
     *         required: true
     *         schema:
     *           type: string
     *           enum:
     *             - application
     *             - audio
     *             - image
     *             - text
     *             - video
     *           example: image
     *         description: Familia del tipo MIME
     *       - in: path
     *         name: countFiles
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de archivos a devolver
     *     responses:
     *       200:
     *         description: Lista de archivos de la familia solicitada
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/SystemFile'
     *       400:
     *         description: Familia MIME o cantidad no válida
     */
    router.get("/family/:family/:countFiles", controller.getFilesByMimeFamily);

    return router;
  }
}
