/**
 * Interfaz que representa un usuario de internet.
 *
 * Contiene la información básica necesaria para mostrar un usuario
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada usuario debe tener un `id` único, un `username`, un `email`,
 * el proveedor de correo (`provider`), una dirección IPv4, un sitio web
 * y la fecha de su última conexión.
 *
 * @example
 * ```ts
 * const usuario: InternetUser = {
 *   id: 1,
 *   username: 'Maxwell_OReilly',
 *   email: 'maxwell.oreilly@gmail.com',
 *   provider: 'gmail.com',
 *   ipv4: '229.151.59.145',
 *   website: 'https://prestigious-trolley.com',
 *   lastLogin: '2026-10-10'
 * };
 * ```
 */
export interface InternetUser {
    /** Identificador único del usuario */
    id: number;

    /** Nombre de usuario */
    username: string;

    /** Correo electrónico */
    email: string;

    /** Proveedor (dominio) del correo */
    provider: InternetProvider;

    /** Dirección IPv4 de la última conexión */
    ipv4: string;

    /** Sitio web personal */
    website: string;

    /** Fecha de la última conexión (YYYY-MM-DD) */
    lastLogin: string;
}

/**
 * Proveedor (dominio) de correo de un usuario.
 *
 * @remarks
 * Este tipo restringe los proveedores a los valores predefinidos:
 * - 'gmail.com'
 * - 'outlook.com'
 * - 'yahoo.com'
 * - 'hotmail.com'
 *
 * Se utiliza para filtrar usuarios y para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const proveedor: InternetProvider = 'gmail.com';
 * ```
 */
export type InternetProvider = 'gmail.com' | 'outlook.com' | 'yahoo.com' | 'hotmail.com';

/**
 * Lista de los proveedores de correo válidos.
 *
 * @remarks
 * Se usa para validar el proveedor que llega en la URL y para
 * elegir un proveedor al azar al generar usuarios.
 */
export const INTERNET_PROVIDERS: InternetProvider[] = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com'];