import { SystemFile } from "../core/domain/models/system.model";

/**
 * Archivos de ejemplo para las pruebas unitarias.
 *
 * @remarks
 * Simulan la respuesta del Microservicio de System
 * para no depender del backend al ejecutar los tests.
 */
export const SYSTEM_FILES_MOCK: SystemFile[] = [
    {
        id: '9b2d6f7e-3c1a-4f5b-8a60-1d2e3f4a5b6c',
        fileName: 'reporte_anual.pdf',
        mimeType: 'application/pdf',
        directoryPath: '/usr/local/bin',
        size: 204800,
        createdAt: '2025-08-14',
    },
    {
        id: '0c8a1b2d-4e5f-4a6b-9c7d-8e9f0a1b2c3d',
        fileName: 'foto_playa.png',
        mimeType: 'image/png',
        directoryPath: '/media',
        size: 1572864,
        createdAt: '2025-09-02',
    }
];
