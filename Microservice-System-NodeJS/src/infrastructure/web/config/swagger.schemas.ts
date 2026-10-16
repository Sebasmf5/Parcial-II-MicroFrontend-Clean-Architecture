/**
 * @openapi
 * components:
 *   schemas:
 *     SystemFile:
 *       type: object
 *       description: Representa un archivo del sistema generado con faker.system
 *       required:
 *         - id
 *         - filename
 *         - email
 *         - family
 *         - ipv4
 *         - website
 *         - lastLogin
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         filename:
 *           type: string
 *           example: Maxwell_OReilly
 *         email:
 *           type: string
 *           format: email
 *           example: maxwell.oreilly@image
 *         family:
 *           type: string
 *           enum:
 *             - image
 *             - outlook.com
 *             - yahoo.com
 *             - hotmail.com
 *           example: image
 *         ipv4:
 *           type: string
 *           example: 229.151.59.145
 *         website:
 *           type: string
 *           example: https://prestigious-trolley.com
 *         lastLogin:
 *           type: string
 *           format: date
 *           example: 2026-10-10
 */
export {};