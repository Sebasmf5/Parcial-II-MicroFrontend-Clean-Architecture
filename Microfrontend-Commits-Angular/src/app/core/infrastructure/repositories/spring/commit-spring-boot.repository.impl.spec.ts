import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { mockCommits } from '../../../../mocks/commits.mock';
import { DataService } from '../../services/data.service';
import { CommitSpringBootRepositoryImpl } from './commit-spring-boot.repository.impl';

describe('CommitSpringBootRepositoryImpl (Infrastructure)', () => {
  let repository: CommitSpringBootRepositoryImpl;

  const dataServiceMock = {
    getAllCommitsSpringBoot: jest.fn(),
    getCommitByHashSpringBoot: jest.fn(),
    getCommitsByAuthorEmailSpringBoot: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommitSpringBootRepositoryImpl,
        { provide: DataService, useValue: dataServiceMock },
      ],
    });
    repository = TestBed.inject(CommitSpringBootRepositoryImpl);
  });

  it('debería crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debería delegar getAll() en DataService.getAllCommitsSpringBoot()', (done) => {
    dataServiceMock.getAllCommitsSpringBoot.mockReturnValue(of(mockCommits));

    repository.getAll().subscribe((commits) => {
      expect(dataServiceMock.getAllCommitsSpringBoot).toHaveBeenCalledTimes(1);
      expect(commits).toEqual(mockCommits);
      done();
    });
  });

  it('debería delegar getByHash() en DataService.getCommitByHashSpringBoot()', (done) => {
    const commit = mockCommits[1];
    dataServiceMock.getCommitByHashSpringBoot.mockReturnValue(of(commit));

    repository.getByHash(commit.hash).subscribe((result) => {
      expect(dataServiceMock.getCommitByHashSpringBoot).toHaveBeenCalledWith(commit.hash);
      expect(result).toEqual(commit);
      done();
    });
  });

  it('debería delegar getByAuthorEmail() en DataService.getCommitsByAuthorEmailSpringBoot()', (done) => {
    const email = 'carlos.perez@example.com';
    const esperado = mockCommits.filter((commit) => commit.authorEmail === email);
    dataServiceMock.getCommitsByAuthorEmailSpringBoot.mockReturnValue(of(esperado));

    repository.getByAuthorEmail(email).subscribe((result) => {
      expect(dataServiceMock.getCommitsByAuthorEmailSpringBoot).toHaveBeenCalledWith(email);
      expect(result).toEqual(esperado);
      done();
    });
  });
});
