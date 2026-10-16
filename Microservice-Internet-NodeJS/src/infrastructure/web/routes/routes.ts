import { Router } from "express";
import { InternetRoutes } from "./internet.routes";

/**
 * Clase encargada de centralizar todas las rutas del microservicio.
 *
 * @remarks
 * Proporciona un único punto de acceso a los endpoints del backend.
 * Este microservicio solo tiene el módulo Internet.
 */
export class AppRoutes {

  /**
   * Devuelve el router principal de la aplicación.
   *
   * @returns Router de Express con todas las rutas registradas
   */
  static get routes(): Router {
    const router = Router();

    // Definir rutas
    router.use("/api/internet", InternetRoutes.routes);

    return router;
  }
}