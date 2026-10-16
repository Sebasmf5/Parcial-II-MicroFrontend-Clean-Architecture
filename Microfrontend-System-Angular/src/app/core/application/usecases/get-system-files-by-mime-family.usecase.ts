import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemMimeFamily, SystemFile } from '../../domain/models/system.model';
import { SystemRepository } from '../../domain/repositories/system.repository';

/**
 * Caso de uso para recuperar los archivos de una familia MIME.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y actúa
 * como intermediario entre la capa de presentación y el dominio,
 * delegando la obtención de datos al contrato `SystemRepository`.
 *
 * @remarks
 * - No conoce detalles de infraestructura (HTTP, URLs, puertos).
 * - No transforma los datos para la UI.
 * - Propaga los resultados y errores al consumidor.
 *
 * @example
 * ```ts
 * this.getSystemFilesByMimeFamilyUseCase.execute('image', 10).subscribe(files => {
 *   // manejo de resultados
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see SystemRepository
 */
@Injectable()
export class GetSystemFilesByMimeFamilyUseCase {

  /**
   * Repositorio de archivos inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en `system.providers.ts`.
   */
  private systemRepository = inject(SystemRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param family - Familia MIME del archivo (application, audio, image, text o video)
   * @param countFiles - Cantidad de archivos a solicitar
   * @returns Observable que emite los archivos de ese familia MIME
   */
  execute(family: SystemMimeFamily, countFiles: number): Observable<SystemFile[]> {
    return this.systemRepository.getByMimeFamily(family, countFiles);
  }
}