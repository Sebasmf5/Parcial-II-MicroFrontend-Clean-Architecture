/**
 * Configuración de variables de entorno del Microfrontend de Internet.
 *
 * @remarks
 * Centraliza la URL del microservicio que consume este microfrontend,
 * para no escribirla a mano dentro de los servicios.
 */
export const environment = {
  /**
   * URL base del Microservicio de Internet (Node.js).
   */
  baseUrlInternet: 'http://localhost:3001',
};