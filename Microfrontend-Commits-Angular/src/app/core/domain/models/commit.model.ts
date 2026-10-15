/**
 * Representa un commit del repositorio Git.
 *
 * Contiene la informacion necesaria para mostrar el historial
 * de cambios en la tabla del microfrontend.
 *
 * @remarks
 * Los datos son generados por el microservicio con JavaFaker y
 * llegan al frontend como una respuesta JSON.
 *
 * @example
 * ```ts
 * const commit: Commit = {
 *   hash: '0000001',
 *   message: 'feat: add commits table',
 *   authorName: 'Laura Gomez',
 *   authorEmail: 'laura@example.com',
 *   branch: 'feature/commits',
 *   createdAt: '2026-10-15T10:30:00',
 *   files: ['src/app/commit-table.component.ts']
 * };
 * ```
 */
export interface Commit {
	/** Identificador unico del commit */
	hash: string;

	/** Mensaje descriptivo del cambio */
	message: string;

	/** Nombre del autor */
	authorName: string;

	/** Correo electronico del autor */
	authorEmail: string;

	/** Rama donde se realizo el commit */
	branch: CommitBranch;

	/** Fecha de creacion en formato ISO recibido desde la API */
	createdAt: string;

	/** Rutas de los archivos modificados */
	files: string[];
}

/** Ramas generadas actualmente por el datasource del backend. */
export type CommitBranch =
	| 'main'
	| 'develop'
	| 'feature/commits'
	| 'fix/commit-filter';
