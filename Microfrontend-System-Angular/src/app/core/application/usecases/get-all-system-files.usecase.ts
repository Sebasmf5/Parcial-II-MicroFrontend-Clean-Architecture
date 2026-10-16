import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemFile } from '../../domain/models/system.model';
import { SystemRepository } from '../../domain/repositories/system.repository';

/**
 * Caso de uso para recuperar el listado de archivos del sistema.
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
 * this.getAllSystemFilesUseCase.execute(10).subscribe(files => {
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
export class GetAllSystemFilesUseCase {

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
   * @param countFiles - Cantidad de archivos a solicitar
   * @returns Observable que emite el listado de archivos
   */
  execute(countFiles: number): Observable<SystemFile[]> {
    return this.systemRepository.getAll(countFiles);
  }
}