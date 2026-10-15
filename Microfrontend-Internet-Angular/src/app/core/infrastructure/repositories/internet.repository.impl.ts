import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InternetProvider, InternetUser } from "../../domain/models/internet.model";
import { InternetRepository } from "../../domain/repositories/internet.repository";
import { InternetService } from "../services/internet.service";

/**
 * Implementación concreta del repositorio de usuarios de internet.
 *
 * @remarks
 * Este repositorio pertenece a la **capa de Infrastructure**
 * y actúa como un **Adapter** entre:
 *
 * - El contrato del dominio {@link InternetRepository}
 * - El API Gateway {@link InternetService}
 *
 *
 * @see {@link InternetRepository}
 * @see {@link InternetService}
 */
@Injectable()
export class InternetRepositoryImpl extends InternetRepository {

    /**
     * Servicio que hace las peticiones al microservicio.
     */
    private internetService = inject(InternetService);

    /**
     * Obtiene el listado de usuarios.
     *
     * @param countUsers - Cantidad de usuarios a solicitar
     * @returns Observable que emite un arreglo de {@link InternetUser}
     */
    getAll(countUsers: number): Observable<InternetUser[]> {
        return this.internetService.getAllUsers(countUsers);
    }

    /**
     * Obtiene un usuario por su identificador.
     *
     * @param id - Identificador del usuario
     * @returns Observable que emite un {@link InternetUser}
     */
    getById(id: number): Observable<InternetUser> {
        return this.internetService.getUserById(id);
    }

    /**
     * Obtiene los usuarios de un proveedor de correo.
     *
     * @param provider - Proveedor (dominio) del correo
     * @param countUsers - Cantidad de usuarios a solicitar
     * @returns Observable que emite un arreglo de {@link InternetUser}
     */
    getByProvider(provider: InternetProvider, countUsers: number): Observable<InternetUser[]> {
        return this.internetService.getUsersByProvider(provider, countUsers);
    }
}