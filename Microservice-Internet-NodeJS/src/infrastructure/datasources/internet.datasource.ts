import { faker } from '@faker-js/faker';
import { INTERNET_PROVIDERS, InternetProvider, InternetUser } from "../../domain/models/internet.model";

/**
 * Datasource de usuarios de internet.
 *
 * @remarks
 * Pertenece a la **capa de infraestructura**. Genera usuarios
 * ficticios con el módulo `faker.internet`.
 *
 * Cada usuario se genera con `faker.seed(id)`, así que el mismo id
 * siempre da el mismo usuario. Gracias a eso el listado, el detalle
 * y el filtro por proveedor muestran datos que coinciden entre sí.
 */
export class InternetDatasource {

    /**
     * Cantidad máxima de ids que se revisan al filtrar por proveedor.
     */
    private readonly MAX_USERS = 1000;

    /**
     * Obtiene un listado de usuarios con ids del 1 a `countUsers`.
     *
     * @param countUsers Cantidad de usuarios a generar
     * @returns Promesa que resuelve un arreglo de usuarios
     */
    async getAll(countUsers: number): Promise<InternetUser[]> {
        const users: Promise<InternetUser>[] = [];

        for (let i = 1; i <= countUsers; i++) {
            users.push(this.generateUser(i));
        }

        return Promise.all(users);
    }

    /**
     * Obtiene el usuario con el identificador indicado.
     *
     * @param id Identificador del usuario
     * @returns Promesa que resuelve el usuario (siempre el mismo para el mismo id)
     */
    async getById(id: number): Promise<InternetUser> {
        return this.generateUser(id);
    }

    /**
     * Filtra los usuarios que tienen el proveedor de correo indicado.
     *
     * @remarks
     * Recorre los usuarios desde el id 1 y se queda con los que tienen ese
     * proveedor, hasta juntar `countUsers` o llegar a `MAX_USERS`.
     *
     * @param provider Proveedor (dominio) del correo
     * @param countUsers Cantidad de usuarios a devolver
     * @returns Promesa que resuelve un arreglo de usuarios de ese proveedor
     */
    async getByProvider(provider: InternetProvider, countUsers: number): Promise<InternetUser[]> {
        const users: InternetUser[] = [];

        for (let id = 1; id <= this.MAX_USERS && users.length < countUsers; id++) {
            const user = await this.generateUser(id);
            if (user.provider === provider) {
                users.push(user);
            }
        }

        return users;
    }

    /**
     * Genera el usuario ficticio de un id.
     *
     * @remarks
     * `faker.seed(id)` hace que faker devuelva siempre los mismos valores
     * para el mismo id. El usuario y el correo salen del mismo nombre y
     * apellido para que se vean relacionados. La fecha se calcula desde el inicio del día para
     * que tampoco cambie entre una petición y otra.
     *
     * @param id Identificador único del usuario
     * @returns Promesa que resuelve el usuario generado
     */
    private generateUser(id: number): Promise<InternetUser> {
        faker.seed(id);
        const provider = faker.helpers.arrayElement(INTERNET_PROVIDERS);
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return Promise.resolve({
            id,
            username: faker.internet.username({ firstName, lastName }),
            email: faker.internet.email({ firstName, lastName, provider }),
            provider,
            ipv4: faker.internet.ipv4(),
            website: faker.internet.url(),
            lastLogin: faker.date.recent({ days: 30, refDate: today }).toISOString().slice(0, 10),
        });
    }

}