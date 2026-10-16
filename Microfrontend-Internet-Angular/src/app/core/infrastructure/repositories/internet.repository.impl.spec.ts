import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { INTERNET_USERS_MOCK } from '../../../mocks/internet.mocks';
import { InternetService } from '../services/internet.service';
import { InternetRepositoryImpl } from './internet.repository.impl';

describe('InternetRepositoryImpl (Infrastructure)', () => {
  let repository: InternetRepositoryImpl;

  const InternetServiceMock = {
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    getUsersByProvider: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InternetRepositoryImpl,
        { provide: InternetService, useValue: InternetServiceMock }
      ]
    });
    repository = TestBed.inject(InternetRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('getAll debe delegar en InternetService.getAllUsers()', (done) => {
    InternetServiceMock.getAllUsers.mockReturnValue(of(INTERNET_USERS_MOCK));
    repository.getAll(5).subscribe((users) => {
      expect(InternetServiceMock.getAllUsers).toHaveBeenCalledWith(5);
      expect(users).toEqual(INTERNET_USERS_MOCK);
      done();
    });
  });

  it('getById debe delegar en InternetService.getUserById()', (done) => {
    InternetServiceMock.getUserById.mockReturnValue(of(INTERNET_USERS_MOCK[0]));
    repository.getById(1).subscribe((user) => {
      expect(InternetServiceMock.getUserById).toHaveBeenCalledWith(1);
      expect(user).toEqual(INTERNET_USERS_MOCK[0]);
      done();
    });
  });

  it('getByProvider debe delegar en InternetService.getUsersByProvider()', (done) => {
    InternetServiceMock.getUsersByProvider.mockReturnValue(of(INTERNET_USERS_MOCK));
    repository.getByProvider('gmail.com', 5).subscribe((users) => {
      expect(InternetServiceMock.getUsersByProvider).toHaveBeenCalledWith('gmail.com', 5);
      expect(users).toEqual(INTERNET_USERS_MOCK);
      done();
    });
  });
});