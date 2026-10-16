/**
 * Configuración de variables de entorno del Microfrontend de System.
 *
 * @remarks
 * Centraliza la URL del microservicio que consume este microfrontend,
 * para no escribirla a mano dentro de los servicios.
 */
export const environment = {
  /**
   * URL base del Microservicio de System (Node.js).
   */
  baseUrlSystem: 'http://localhost:3003',
};