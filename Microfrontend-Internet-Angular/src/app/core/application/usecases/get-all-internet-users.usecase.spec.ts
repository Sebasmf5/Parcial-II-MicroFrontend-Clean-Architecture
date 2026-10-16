import { TestBed } from "@angular/core/testing";
import { firstValueFrom, of, throwError } from "rxjs";
import { InternetRepository } from "../../domain/repositories/internet.repository";
import { INTERNET_USERS_MOCK } from "../../../mocks/internet.mocks";
import { GetAllInternetUsersUseCase } from "./get-all-internet-users.usecase";

describe('GetAllInternetUsersUseCase', () => {
  let useCase: GetAllInternetUsersUseCase;

  const countUsers = 5;
  const InternetRepositoryMock: jest.Mocked<InternetRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getByProvider: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            GetAllInternetUsersUseCase,
            { provide: InternetRepository, useValue: InternetRepositoryMock }
        ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetAllInternetUsersUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllInternetUsersUseCase);
  });

  it('debería delegar la llamada al repositorio', async () => {
    InternetRepositoryMock.getAll.mockReturnValue(of(INTERNET_USERS_MOCK));
    const result = await firstValueFrom(useCase.execute(countUsers));
    expect(InternetRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(InternetRepositoryMock.getAll).toHaveBeenCalledWith(countUsers);
    expect(result).toEqual(INTERNET_USERS_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la busqueda de usuarios';
    InternetRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));
    await expect(firstValueFrom(useCase.execute(countUsers))).rejects.toThrow(errorMessage);
  });

});