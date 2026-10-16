import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { mockCommits } from '../../../mocks/commits.mock';
import { CommitRepository } from '../../domain/repositories/commit.repository';
import { GetCommitByHashUseCase } from './get-commit-by-hash.usecase';

describe('GetCommitByHashUseCase', () => {
  let useCase: GetCommitByHashUseCase;

  const hash = mockCommits[0].hash;
  const commitRepositoryMock: jest.Mocked<CommitRepository> = {
    getAll: jest.fn(),
    getByHash: jest.fn(),
    getByAuthorEmail: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetCommitByHashUseCase,
        { provide: CommitRepository, useValue: commitRepositoryMock },
      ],
    });
    useCase = TestBed.inject(GetCommitByHashUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetCommitByHashUseCase);
  });

  it('debería delegar la llamada al repositorio con el hash recibido', async () => {
    commitRepositoryMock.getByHash.mockReturnValue(of(mockCommits[0]));

    const result = await firstValueFrom(useCase.execute(hash));

    expect(commitRepositoryMock.getByHash).toHaveBeenCalledTimes(1);
    expect(commitRepositoryMock.getByHash).toHaveBeenCalledWith(hash);
    expect(result).toEqual(mockCommits[0]);
  });

  it('debería propagar el error cuando el commit no existe', async () => {
    const errorMessage = `Commit not found: ${hash}`;
    commitRepositoryMock.getByHash.mockReturnValue(throwError(() => new Error(errorMessage)));

    await expect(firstValueFrom(useCase.execute(hash))).rejects.toThrow(errorMessage);
    expect(commitRepositoryMock.getByHash).toHaveBeenCalledWith(hash);
  });
});
