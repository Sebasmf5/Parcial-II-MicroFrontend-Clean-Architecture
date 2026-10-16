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
        id: 1,
        filename: 'Maxwell_OReilly',
        email: 'maxwell.oreilly@image',
        family: 'image',
        ipv4: '229.151.59.145',
        website: 'https://prestigious-trolley.com',
        lastLogin: '2026-10-10',
    },
    {
        id: 2,
        filename: 'Jana49',
        email: 'aileen4@outlook.com',
        family: 'outlook.com',
        ipv4: '210.146.56.194',
        website: 'https://squeaky-fog.name',
        lastLogin: '2026-10-08',
    }
];