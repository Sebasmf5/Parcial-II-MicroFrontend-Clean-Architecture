import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { InternetProvider, InternetUser } from "../../domain/models/internet.model";

/**
 * Servicio de infraestructura que consume el Microservicio de Internet.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * **API Gateway** del microfrontend: es el único lugar que conoce la URL
 * del microservicio y hace las peticiones HTTP.
 *
 * solo por la implementación del repositorio.
 */
@Injectable({ providedIn: 'root' })
export class InternetService {
    /**
     * Cliente HTTP de Angular.
     */
    private httpClient = inject(HttpClient);
    /**
     * URL base de la API de internet.
     */
    private internetUrl = `${environment.baseUrlInternet}/api/internet`;

    /**
     * Obtiene el listado de usuarios.
     *
     * @param countUsers - Cantidad de usuarios a solicitar
     * @returns Observable que emite un arreglo de {@link InternetUser}
     */
    getAllUsers(countUsers: number): Observable<InternetUser[]> {
        return this.httpClient.get<InternetUser[]>(`${this.internetUrl}/${countUsers}`);
    }

    /**
     * Obtiene un usuario por su identificador.
     *
     * @param id - Identificador del usuario
     * @returns Observable que emite un {@link InternetUser}
     */
    getUserById(id: number): Observable<InternetUser> {
        return this.httpClient.get<InternetUser>(`${this.internetUrl}/detail/${id}`);
    }

    /**
     * Obtiene los usuarios de un proveedor de correo.
     *
     * @param provider - Proveedor (dominio) del correo
     * @param countUsers - Cantidad de usuarios a solicitar
     * @returns Observable que emite un arreglo de {@link InternetUser}
     */
    getUsersByProvider(provider: InternetProvider, countUsers: number): Observable<InternetUser[]> {
        return this.httpClient.get<InternetUser[]>(`${this.internetUrl}/provider/${provider}/${countUsers}`);
    }
}