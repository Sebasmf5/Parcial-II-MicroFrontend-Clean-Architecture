import { InternetUser } from "../core/domain/models/internet.model";

/**
 * Usuarios de ejemplo para las pruebas unitarias.
 *
 * @remarks
 * Simulan la respuesta del Microservicio de Internet
 * para no depender del backend al ejecutar los tests.
 */
export const INTERNET_USERS_MOCK: InternetUser[] = [
    {
        id: 1,
        username: 'Maxwell_OReilly',
        email: 'maxwell.oreilly@gmail.com',
        provider: 'gmail.com',
        ipv4: '229.151.59.145',
        website: 'https://prestigious-trolley.com',
        lastLogin: '2026-10-10',
    },
    {
        id: 2,
        username: 'Jana49',
        email: 'aileen4@outlook.com',
        provider: 'outlook.com',
        ipv4: '210.146.56.194',
        website: 'https://squeaky-fog.name',
        lastLogin: '2026-10-08',
    }
];