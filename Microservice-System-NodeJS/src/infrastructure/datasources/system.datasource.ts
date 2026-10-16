import { faker } from '@faker-js/faker';
import { SYSTEM_MIME_FAMILIES, SystemMimeFamily, SystemFile } from "../../domain/models/system.model";

/**
 * Datasource de archivos del sistema.
 *
 * @remarks
 * Pertenece a la **capa de infraestructura**. Genera archivos
 * ficticios con el módulo `faker.system`.
 *
 * Cada archivo se genera con `faker.seed(id)`, así que el mismo id
 * siempre da el mismo archivo. Gracias a eso el listado, el detalle
 * y el filtro por familia MIME muestran datos que coinciden entre sí.
 */
export class SystemDatasource {

    /**
     * Cantidad máxima de ids que se revisan al filtrar por familia MIME.
     */
    private readonly MAX_USERS = 1000;

    /**
     * Obtiene un listado de archivos con ids del 1 a `countFiles`.
     *
     * @param countFiles Cantidad de archivos a generar
     * @returns Promesa que resuelve un arreglo de archivos
     */
    async getAll(countFiles: number): Promise<SystemFile[]> {
        const files: Promise<SystemFile>[] = [];

        for (let i = 1; i <= countFiles; i++) {
            files.push(this.generateUser(i));
        }

        return Promise.all(files);
    }

    /**
     * Obtiene el archivo con el identificador indicado.
     *
     * @param id Identificador del archivo
     * @returns Promesa que resuelve el archivo (siempre el mismo para el mismo id)
     */
    async getById(id: string): Promise<SystemFile> {
        return this.generateUser(id);
    }

    /**
     * Filtra los archivos que tienen el familia MIME indicado.
     *
     * @remarks
     * Recorre los archivos desde el id 1 y se queda con los que tienen ese
     * familia MIME, hasta juntar `countFiles` o llegar a `MAX_USERS`.
     *
     * @param family Familia MIME del archivo (application, audio, image, text o video)
     * @param countFiles Cantidad de archivos a devolver
     * @returns Promesa que resuelve un arreglo de archivos de ese familia MIME
     */
    async getByMimeFamily(family: SystemMimeFamily, countFiles: number): Promise<SystemFile[]> {
        const files: SystemFile[] = [];

        for (let id = 1; id <= this.MAX_USERS && files.length < countFiles; id++) {
            const file = await this.generateUser(id);
            if (file.family === family) {
                files.push(file);
            }
        }

        return files;
    }

    /**
     * Genera el archivo ficticio de un id.
     *
     * @remarks
     * `faker.seed(id)` hace que faker devuelva siempre los mismos valores
     * para el mismo id. El archivo y el correo salen del mismo nombre y
     * apellido para que se vean relacionados. La fecha se calcula desde el inicio del día para
     * que tampoco cambie entre una petición y otra.
     *
     * @param id Identificador único del archivo
     * @returns Promesa que resuelve el archivo generado
     */
    private generateUser(id: number): Promise<SystemFile> {
        faker.seed(id);
        const family = faker.helpers.arrayElement(SYSTEM_MIME_FAMILIES);
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return Promise.resolve({
            id,
            filename: faker.system.filename({ firstName, lastName }),
            email: faker.system.email({ firstName, lastName, family }),
            family,
            ipv4: faker.system.ipv4(),
            website: faker.system.url(),
            lastLogin: faker.date.recent({ days: 30, refDate: today }).toISOString().slice(0, 10),
        });
    }

}