import { Commit } from '../app/core/domain/models/commit.model';

/** Datos simulados para desarrollo y pruebas del microfrontend. */
export const mockCommits: Commit[] = [
  {
    hash: '0000001',
    message: 'feat: create commit model',
    authorName: 'Laura Gomez',
    authorEmail: 'laura.gomez@example.com',
    branch: 'feature/commits',
    createdAt: '2026-10-15T10:30:00',
    files: ['src/app/core/domain/models/commit.model.ts'],
  },
  {
    hash: '0000002',
    message: 'feat: add commits repository',
    authorName: 'Carlos Perez',
    authorEmail: 'carlos.perez@example.com',
    branch: 'develop',
    createdAt: '2026-10-14T09:15:00',
    files: ['src/app/core/domain/repositories/commit.repository.ts'],
  },
  {
    hash: '0000003',
    message: 'fix: configure commit filters',
    authorName: 'Laura Gomez',
    authorEmail: 'laura.gomez@example.com',
    branch: 'fix/commit-filter',
    createdAt: '2026-10-13T14:45:00',
    files: ['src/app/core/application/usecases/get-commits-by-author-email.usecase.ts'],
  },
  {
    hash: '0000004',
    message: 'docs: update project documentation',
    authorName: 'Ana Torres',
    authorEmail: 'ana.torres@example.com',
    branch: 'main',
    createdAt: '2026-10-12T11:20:00',
    files: ['README.md'],
  },
  {
    hash: '0000005',
    message: 'chore: configure module federation',
    authorName: 'Carlos Perez',
    authorEmail: 'carlos.perez@example.com',
    branch: 'feature/commits',
    createdAt: '2026-10-11T16:10:00',
    files: ['webpack.config.js', 'angular.json'],
  },
];
