/**
 * @openapi
 * components:
 *   schemas:
 *     SystemFile:
 *       type: object
 *       description: Representa un archivo del sistema generado con faker.system
 *       required:
 *         - id
 *         - fileName
 *         - mimeType
 *         - directoryPath
 *         - size
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 9b2d6f7e-3c1a-4f5b-8a60-1d2e3f4a5b6c
 *         fileName:
 *           type: string
 *           example: reporte_anual.pdf
 *         mimeType:
 *           type: string
 *           example: application/pdf
 *         directoryPath:
 *           type: string
 *           example: /usr/local/bin
 *         size:
 *           type: integer
 *           description: Tamaño en bytes
 *           example: 204800
 *         createdAt:
 *           type: string
 *           format: date
 *           example: 2025-08-14
 */
export {};
