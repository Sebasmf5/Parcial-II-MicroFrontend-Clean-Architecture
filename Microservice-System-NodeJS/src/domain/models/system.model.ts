/**
 * Interfaz que representa un archivo del sistema.
 *
 * Contiene la información básica necesaria para mostrar un archivo
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada archivo tiene un `id` único (UUID), un nombre, su tipo MIME,
 * la carpeta donde está, su tamaño en bytes y su fecha de creación.
 *
 * @example
 * ```ts
 * const archivo: SystemFile = {
 *   id: '9b2d6f7e-3c1a-4f5b-8a60-1d2e3f4a5b6c',
 *   fileName: 'reporte_anual.pdf',
 *   mimeType: 'application/pdf',
 *   directoryPath: '/usr/local/bin',
 *   size: 204800,
 *   createdAt: '2025-08-14'
 * };
 * ```
 */
export interface SystemFile {
    /** Identificador único del archivo (UUID) */
    id: string;

    /** Nombre del archivo con su extensión */
    fileName: string;

    /** Tipo MIME completo, por ejemplo `image/png` */
    mimeType: string;

    /** Ruta de la carpeta donde está el archivo */
    directoryPath: string;

    /** Tamaño del archivo en bytes */
    size: number;

    /** Fecha de creación del archivo (YYYY-MM-DD) */
    createdAt: string;
}

/**
 * Familia de un tipo MIME.
 *
 * @remarks
 * Es la parte del tipo MIME que va antes de la barra
 * (en `image/png` la familia es `image`). Este tipo restringe
 * el filtro a las familias que ofrece el microservicio:
 * - 'application'
 * - 'audio'
 * - 'image'
 * - 'text'
 * - 'video'
 *
 * @example
 * ```ts
 * const familia: SystemMimeFamily = 'image';
 * ```
 */
export type SystemMimeFamily = 'application' | 'audio' | 'image' | 'text' | 'video';

/**
 * Lista de las familias MIME válidas.
 *
 * @remarks
 * Se usa para validar la familia que llega en la URL.
 */
export const SYSTEM_MIME_FAMILIES: SystemMimeFamily[] = ['application', 'audio', 'image', 'text', 'video'];
