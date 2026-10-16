/**
 * @openapi
 * components:
 *   schemas:
 *     InternetUser:
 *       type: object
 *       description: Representa un usuario de internet generado con faker.internet
 *       required:
 *         - id
 *         - username
 *         - email
 *         - provider
 *         - ipv4
 *         - website
 *         - lastLogin
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         username:
 *           type: string
 *           example: Maxwell_OReilly
 *         email:
 *           type: string
 *           format: email
 *           example: maxwell.oreilly@gmail.com
 *         provider:
 *           type: string
 *           enum:
 *             - gmail.com
 *             - outlook.com
 *             - yahoo.com
 *             - hotmail.com
 *           example: gmail.com
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