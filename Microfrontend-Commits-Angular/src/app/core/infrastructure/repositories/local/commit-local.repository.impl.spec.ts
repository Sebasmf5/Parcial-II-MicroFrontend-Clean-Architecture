import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { mockCommits } from '../../../../mocks/commits.mock';
import { DataService } from '../../services/data.service';
import { CommitLocalRepositoryImpl } from './commit-local.repository.impl';

describe('CommitLocalRepositoryImpl (Infrastructure)', () => {
  let repository: CommitLocalRepositoryImpl;

  const dataServiceMock = {
    getAllCommitsLocal: jest.fn(),
    getCommitByHashLocal: jest.fn(),
    getCommitsByAuthorEmailLocal: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommitLocalRepositoryImpl,
        { provide: DataService, useValue: dataServiceMock },
      ],
    });
    repository = TestBed.inject(CommitLocalRepositoryImpl);
  });

  it('debería crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debería delegar getAll() en DataService.getAllCommitsLocal()', (done) => {
    dataServiceMock.getAllCommitsLocal.mockReturnValue(of(mockCommits));

    repository.getAll().subscribe((commits) => {
      expect(dataServiceMock.getAllCommitsLocal).toHaveBeenCalledTimes(1);
      expect(commits).toEqual(mockCommits);
      done();
    });
  });

  it('debería delegar getByHash() en DataService.getCommitByHashLocal()', (done) => {
    const commit = mockCommits[1];
    dataServiceMock.getCommitByHashLocal.mockReturnValue(of(commit));

    repository.getByHash(commit.hash).subscribe((result) => {
      expect(dataServiceMock.getCommitByHashLocal).toHaveBeenCalledWith(commit.hash);
      expect(result).toEqual(commit);
      done();
    });
  });

  it('debería delegar getByAuthorEmail() en DataService.getCommitsByAuthorEmailLocal()', (done) => {
    const email = 'carlos.perez@example.com';
    const esperado = mockCommits.filter((commit) => commit.authorEmail === email);
    dataServiceMock.getCommitsByAuthorEmailLocal.mockReturnValue(of(esperado));

    repository.getByAuthorEmail(email).subscribe((result) => {
      expect(dataServiceMock.getCommitsByAuthorEmailLocal).toHaveBeenCalledWith(email);
      expect(result).toEqual(esperado);
      done();
    });
  });
});
