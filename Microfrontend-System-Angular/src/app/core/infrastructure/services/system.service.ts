import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { SystemMimeFamily, SystemFile } from "../../domain/models/system.model";

/**
 * Servicio de infraestructura que consume el Microservicio de System.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * **API Gateway** del microfrontend: es el único lugar que conoce la URL
 * del microservicio y hace las peticiones HTTP.
 *
 * solo por la implementación del repositorio.
 */
@Injectable({ providedIn: 'root' })
export class SystemService {
    /**
     * Cliente HTTP de Angular.
     */
    private httpClient = inject(HttpClient);
    /**
     * URL base de la API de system.
     */
    private systemUrl = `${environment.baseUrlSystem}/api/system`;

    /**
     * Obtiene el listado de archivos.
     *
     * @param countFiles - Cantidad de archivos a solicitar
     * @returns Observable que emite un arreglo de {@link SystemFile}
     */
    getAllFiles(countFiles: number): Observable<SystemFile[]> {
        return this.httpClient.get<SystemFile[]>(`${this.systemUrl}/${countFiles}`);
    }

    /**
     * Obtiene un archivo por su identificador.
     *
     * @param id - Identificador del archivo
     * @returns Observable que emite un {@link SystemFile}
     */
    getFileById(id: string): Observable<SystemFile> {
        return this.httpClient.get<SystemFile>(`${this.systemUrl}/detail/${id}`);
    }

    /**
     * Obtiene los archivos de una familia MIME.
     *
     * @param family - Familia MIME del archivo (application, audio, image, text o video)
     * @param countFiles - Cantidad de archivos a solicitar
     * @returns Observable que emite un arreglo de {@link SystemFile}
     */
    getFilesByMimeFamily(family: SystemMimeFamily, countFiles: number): Observable<SystemFile[]> {
        return this.httpClient.get<SystemFile[]>(`${this.systemUrl}/family/${family}/${countFiles}`);
    }
}