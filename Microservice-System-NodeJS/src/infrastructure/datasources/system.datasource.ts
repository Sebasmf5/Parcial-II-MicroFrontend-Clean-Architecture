import { faker } from '@faker-js/faker';
import { SystemFile, SystemMimeFamily } from "../../domain/models/system.model";
import { CustomError } from "../web/errors/custom.error";

/**
 * Datasource de archivos del sistema.
 *
 * @remarks
 * Pertenece a la **capa de infraestructura**. Genera archivos
 * ficticios con el módulo `faker.system`.
 *
 * Al arrancar crea un catálogo fijo de archivos. Cada archivo se genera
 * con `faker.seed(posición)`, así que el catálogo es siempre el mismo.
 * Gracias a eso el listado, el detalle por id y el filtro por familia MIME
 * muestran datos que coinciden entre sí.
 */
export class SystemDatasource {

    /**
     * Cantidad de archivos que tiene el catálogo.
     */
    private readonly CATALOG_SIZE = 500;

    /**
     * Fecha de referencia para generar las fechas de creación.
     * Es fija para que la fecha de un archivo no cambie entre peticiones.
     */
    private readonly REFERENCE_DATE = new Date('2026-01-01T00:00:00.000Z');

    /**
     * Catálogo de archivos generados con faker.
     */
    private readonly catalog: SystemFile[] = this.buildCatalog();

    /**
     * Obtiene los primeros `countFiles` archivos del catálogo.
     *
     * @param countFiles Cantidad de archivos a devolver
     * @returns Promesa que resuelve un arreglo de archivos
     */
    async getAll(countFiles: number): Promise<SystemFile[]> {
        return this.catalog.slice(0, countFiles);
    }

    /**
     * Obtiene el archivo con el identificador indicado.
     *
     * @param id Identificador (UUID) del archivo
     * @returns Promesa que resuelve el archivo
     * @throws CustomError 404 si no existe un archivo con ese id
     */
    async getById(id: string): Promise<SystemFile> {
        const file = this.catalog.find((item) => item.id === id);

        if (!file) {
            throw CustomError.notFound(`No existe un archivo con el id: ${id}`);
        }

        return file;
    }

    /**
     * Filtra los archivos cuyo tipo MIME es de la familia indicada.
     *
     * @remarks
     * Una familia es la parte del tipo MIME que va antes de la barra:
     * `image/png` es de la familia `image`.
     *
     * @param family Familia MIME (application, audio, image, text o video)
     * @param countFiles Cantidad de archivos a devolver
     * @returns Promesa que resuelve un arreglo de archivos de esa familia
     */
    async getByMimeFamily(family: SystemMimeFamily, countFiles: number): Promise<SystemFile[]> {
        return this.catalog
            .filter((item) => item.mimeType.startsWith(`${family}/`))
            .slice(0, countFiles);
    }

    /**
     * Construye el catálogo de archivos.
     *
     * @returns Arreglo con `CATALOG_SIZE` archivos
     */
    private buildCatalog(): SystemFile[] {
        const files: SystemFile[] = [];

        for (let position = 1; position <= this.CATALOG_SIZE; position++) {
            files.push(this.generateFile(position));
        }

        return files;
    }

    /**
     * Genera el archivo ficticio de una posición del catálogo.
     *
     * @remarks
     * `faker.seed(position)` hace que faker devuelva siempre los mismos
     * valores para la misma posición, incluido el UUID.
     *
     * @param position Posición del archivo en el catálogo
     * @returns Archivo generado
     */
    private generateFile(position: number): SystemFile {
        faker.seed(position);

        return {
            id: faker.string.uuid(),
            fileName: faker.system.fileName(),
            mimeType: faker.system.mimeType(),
            directoryPath: faker.system.directoryPath(),
            size: faker.number.int({ min: 1024, max: 5000000 }),
            createdAt: faker.date.past({ years: 2, refDate: this.REFERENCE_DATE }).toISOString().slice(0, 10),
        };
    }

}
