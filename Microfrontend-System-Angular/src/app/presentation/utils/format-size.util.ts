/**
 * Convierte un tamaño en bytes a un texto fácil de leer.
 *
 * @remarks
 * - Menos de 1 KB se muestra en bytes (`512 B`).
 * - Menos de 1 MB se muestra en kilobytes (`200.0 KB`).
 * - Desde 1 MB se muestra en megabytes (`1.5 MB`).
 *
 * @param bytes - Tamaño del archivo en bytes
 * @returns Texto con el tamaño y su unidad
 *
 * @example
 * ```ts
 * formatSize(204800); // '200.0 KB'
 * ```
 */
export function formatSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
