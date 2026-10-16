import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemFile } from '../../domain/models/system.model';
import { SystemRepository } from '../../domain/repositories/system.repository';

/**
 * Caso de uso para recuperar el detalle de un archivo del sistema.
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
 * this.getSystemFileByIdUseCase.execute(5).subscribe(file => {
 *   // manejo del resultado
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see SystemRepository
 */
@Injectable()
export class GetSystemFileByIdUseCase {

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
   * @param id - Identificador del archivo
   * @returns Observable que emite el archivo
   */
  execute(id: string): Observable<SystemFile> {
    return this.systemRepository.getById(id);
  }
}