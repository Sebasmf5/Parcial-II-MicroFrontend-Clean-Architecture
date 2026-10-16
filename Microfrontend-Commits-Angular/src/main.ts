/**
 * Punto de entrada del microfrontend.
 *
 * @remarks
 * Carga `bootstrap.ts` con un import dinámico para que Module Federation
 * resuelva las dependencias compartidas antes de iniciar Angular.
 */
import('./bootstrap')
	.catch(err => console.error(err));
