import { faker } from '@faker-js/faker';
import { INTERNET_PROVIDERS, InternetProvider, InternetUser } from "../../domain/models/internet.model";

/**
 * Datasource de usuarios de internet.
 *
 * @remarks
 * Pertenece a la **capa de infraestructura**. Genera usuarios
 * ficticios con el módulo `faker.internet`.
 */
export class InternetDatasource {

    /**
     * Obtiene un listado de usuarios generados dinámicamente.
     *
     * @param countUsers Cantidad de usuarios a generar
     * @returns Promesa que resuelve un arreglo de usuarios
     */
    async getAll(countUsers: number): Promise<InternetUser[]> {
        const users: Promise<InternetUser>[] = [];

        for (let i = 1; i <= countUsers; i++) {
            users.push(this.generateUser(i, faker.helpers.arrayElement(INTERNET_PROVIDERS)));
        }

        return Promise.all(users);
    }

    /**
     * Obtiene un usuario con el identificador indicado.
     *
     * @param id Identificador del usuario
     * @returns Promesa que resuelve un usuario generado
     */
    async getById(id: number): Promise<InternetUser> {
        return this.generateUser(id, faker.helpers.arrayElement(INTERNET_PROVIDERS));
    }

    /**
     * Obtiene un listado de usuarios que tienen el mismo proveedor de correo.
     *
     * @param provider Proveedor (dominio) del correo de todos los usuarios
     * @param countUsers Cantidad de usuarios a generar
     * @returns Promesa que resuelve un arreglo de usuarios de ese proveedor
     */
    async getByProvider(provider: InternetProvider, countUsers: number): Promise<InternetUser[]> {
        const users: Promise<InternetUser>[] = [];

        for (let i = 1; i <= countUsers; i++) {
            users.push(this.generateUser(i, provider));
        }

        return Promise.all(users);
    }

    /**
     * Genera un usuario ficticio.
     *
     * @param id Identificador único del usuario
     * @param provider Proveedor (dominio) del correo del usuario
     * @returns Promesa que resuelve un usuario generado
     */
    private generateUser(id: number, provider: InternetProvider): Promise<InternetUser> {
        return Promise.resolve({
            id,
            username: faker.internet.username(),
            email: faker.internet.email({ provider }),
            provider,
            ipv4: faker.internet.ipv4(),
            website: faker.internet.url(),
            lastLogin: faker.date.recent({ days: 30 }).toISOString().slice(0, 10),
        });
    }

}