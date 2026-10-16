import { envs } from "./infrastructure/web/config/envs";
import { AppRoutes } from "./infrastructure/web/routes/routes";
import { Server } from "./infrastructure/web/server";

/**
 * Función principal que instancia y arranca el servidor.
 */
function main(): void {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });
  server.start();
}

/**
 * Ejecución inmediata de la función principal.
 *
 * @remarks
 * Se utiliza un IIFE (Immediately Invoked Function Expression)
 * para iniciar la aplicación automáticamente.
 */
(async () => {
  main();
})();