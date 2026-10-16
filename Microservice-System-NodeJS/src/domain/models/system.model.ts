/**
 * Interfaz que representa un archivo del sistema.
 *
 * Contiene la información básica necesaria para mostrar un archivo
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada archivo debe tener un `id` único, un `filename`, un `email`,
 * el familia MIME (`family`), una dirección IPv4, un sitio web
 * y la fecha de su última conexión.
 *
 * @example
 * ```ts
 * const archivo: SystemFile = {
 *   id: 1,
 *   filename: 'Maxwell_OReilly',
 *   email: 'maxwell.oreilly@image',
 *   family: 'image',
 *   ipv4: '229.151.59.145',
 *   website: 'https://prestigious-trolley.com',
 *   lastLogin: '2026-10-10'
 * };
 * ```
 */
export interface SystemFile {
    /** Identificador único del archivo */
    id: number;

    /** Nombre de archivo */
    filename: string;

    /** Correo electrónico */
    email: string;

    /** Familia MIME del archivo (application, audio, image, text o video) */
    family: SystemMimeFamily;

    /** Dirección IPv4 de la última conexión */
    ipv4: string;

    /** Sitio web personal */
    website: string;

    /** Fecha de la última conexión (YYYY-MM-DD) */
    lastLogin: string;
}

/**
 * Proveedor (dominio) de correo de un archivo.
 *
 * @remarks
 * Este tipo restringe las familias MIME a los valores predefinidos:
 * - 'image'
 * - 'outlook.com'
 * - 'yahoo.com'
 * - 'hotmail.com'
 *
 * Se utiliza para filtrar archivos y para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const familia MIME: SystemMimeFamily = 'image';
 * ```
 */
export type SystemMimeFamily = 'image' | 'outlook.com' | 'yahoo.com' | 'hotmail.com';

/**
 * Lista de las familias MIME de correo válidos.
 *
 * @remarks
 * Se usa para validar el familia MIME que llega en la URL y para
 * elegir una familia MIME al azar al generar archivos.
 */
export const SYSTEM_MIME_FAMILIES: SystemMimeFamily[] = ['image', 'outlook.com', 'yahoo.com', 'hotmail.com'];