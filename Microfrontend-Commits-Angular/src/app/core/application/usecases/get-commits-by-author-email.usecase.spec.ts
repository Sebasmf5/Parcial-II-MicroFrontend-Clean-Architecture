import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { mockCommits } from '../../../mocks/commits.mock';
import { CommitRepository } from '../../domain/repositories/commit.repository';
import { GetCommitsByAuthorEmailUseCase } from './get-commits-by-author-email.usecase';

describe('GetCommitsByAuthorEmailUseCase', () => {
  let useCase: GetCommitsByAuthorEmailUseCase;

  const authorEmail = 'laura.gomez@example.com';
  const commitsDeLaura = mockCommits.filter((commit) => commit.authorEmail === authorEmail);
  const commitRepositoryMock: jest.Mocked<CommitRepository> = {
    getAll: jest.fn(),
    getByHash: jest.fn(),
    getByAuthorEmail: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetCommitsByAuthorEmailUseCase,
        { provide: CommitRepository, useValue: commitRepositoryMock },
      ],
    });
    useCase = TestBed.inject(GetCommitsByAuthorEmailUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetCommitsByAuthorEmailUseCase);
  });

  it('debería delegar la llamada al repositorio con el correo recibido', async () => {
    commitRepositoryMock.getByAuthorEmail.mockReturnValue(of(commitsDeLaura));

    const result = await firstValueFrom(useCase.execute(authorEmail));

    expect(commitRepositoryMock.getByAuthorEmail).toHaveBeenCalledTimes(1);
    expect(commitRepositoryMock.getByAuthorEmail).toHaveBeenCalledWith(authorEmail);
    expect(result).toEqual(commitsDeLaura);
  });

  it('debería propagar el error cuando el repositorio falla', async () => {
    const errorMessage = 'Falló el filtro por autor';
    commitRepositoryMock.getByAuthorEmail.mockReturnValue(
      throwError(() => new Error(errorMessage)),
    );

    await expect(firstValueFrom(useCase.execute(authorEmail))).rejects.toThrow(errorMessage);
    expect(commitRepositoryMock.getByAuthorEmail).toHaveBeenCalledWith(authorEmail);
  });
});
