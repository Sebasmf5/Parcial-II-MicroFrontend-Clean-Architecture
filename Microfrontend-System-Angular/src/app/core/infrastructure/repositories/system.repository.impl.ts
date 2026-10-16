import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SystemMimeFamily, SystemFile } from "../../domain/models/system.model";
import { SystemRepository } from "../../domain/repositories/system.repository";
import { SystemService } from "../services/system.service";

/**
 * Implementación concreta del repositorio de archivos del sistema.
 *
 * @remarks
 * Este repositorio pertenece a la **capa de Infrastructure**
 * y actúa como un **Adapter** entre:
 *
 * - El contrato del dominio {@link SystemRepository}
 * - El API Gateway {@link SystemService}
 *
 *
 * @see {@link SystemRepository}
 * @see {@link SystemService}
 */
@Injectable()
export class SystemRepositoryImpl extends SystemRepository {

    /**
     * Servicio que hace las peticiones al microservicio.
     */
    private systemService = inject(SystemService);

    /**
     * Obtiene el listado de archivos.
     *
     * @param countFiles - Cantidad de archivos a solicitar
     * @returns Observable que emite un arreglo de {@link SystemFile}
     */
    getAll(countFiles: number): Observable<SystemFile[]> {
        return this.systemService.getAllFiles(countFiles);
    }

    /**
     * Obtiene un archivo por su identificador.
     *
     * @param id - Identificador del archivo
     * @returns Observable que emite un {@link SystemFile}
     */
    getById(id: string): Observable<SystemFile> {
        return this.systemService.getFileById(id);
    }

    /**
     * Obtiene los archivos de una familia MIME.
     *
     * @param family - Familia MIME del archivo (application, audio, image, text o video)
     * @param countFiles - Cantidad de archivos a solicitar
     * @returns Observable que emite un arreglo de {@link SystemFile}
     */
    getByMimeFamily(family: SystemMimeFamily, countFiles: number): Observable<SystemFile[]> {
        return this.systemService.getFilesByMimeFamily(family, countFiles);
    }
}