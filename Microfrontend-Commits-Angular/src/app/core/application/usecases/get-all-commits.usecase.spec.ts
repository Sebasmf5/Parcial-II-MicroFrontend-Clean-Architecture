import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { mockCommits } from '../../../mocks/commits.mock';
import { CommitRepository } from '../../domain/repositories/commit.repository';
import { GetAllCommitsUseCase } from './get-all-commits.usecase';

describe('GetAllCommitsUseCase', () => {
  let useCase: GetAllCommitsUseCase;

  const commitRepositoryMock: jest.Mocked<CommitRepository> = {
    getAll: jest.fn(),
    getByHash: jest.fn(),
    getByAuthorEmail: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetAllCommitsUseCase,
        { provide: CommitRepository, useValue: commitRepositoryMock },
      ],
    });
    useCase = TestBed.inject(GetAllCommitsUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllCommitsUseCase);
  });

  it('debería delegar la llamada al repositorio y devolver los commits', async () => {
    commitRepositoryMock.getAll.mockReturnValue(of(mockCommits));

    const result = await firstValueFrom(useCase.execute());

    expect(commitRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCommits);
  });

  it('debería propagar el error cuando el repositorio falla', async () => {
    const errorMessage = 'Falló la búsqueda de commits';
    commitRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));

    await expect(firstValueFrom(useCase.execute())).rejects.toThrow(errorMessage);
    expect(commitRepositoryMock.getAll).toHaveBeenCalledTimes(1);
  });
});
