import { TestBed } from "@angular/core/testing";
import { firstValueFrom, of, throwError } from "rxjs";
import { InternetRepository } from "../../domain/repositories/internet.repository";
import { INTERNET_USERS_MOCK } from "../../../mocks/internet.mocks";
import { GetInternetUsersByProviderUseCase } from "./get-internet-users-by-provider.usecase";

describe('GetInternetUsersByProviderUseCase', () => {
  let useCase: GetInternetUsersByProviderUseCase;

  const provider = 'gmail.com';
  const countUsers = 5;
  const InternetRepositoryMock: jest.Mocked<InternetRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getByProvider: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            GetInternetUsersByProviderUseCase,
            { provide: InternetRepository, useValue: InternetRepositoryMock }
        ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetInternetUsersByProviderUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetInternetUsersByProviderUseCase);
  });

  it('debería delegar la llamada al repositorio', async () => {
    InternetRepositoryMock.getByProvider.mockReturnValue(of(INTERNET_USERS_MOCK));
    const result = await firstValueFrom(useCase.execute(provider, countUsers));
    expect(InternetRepositoryMock.getByProvider).toHaveBeenCalledTimes(1);
    expect(InternetRepositoryMock.getByProvider).toHaveBeenCalledWith(provider, countUsers);
    expect(result).toEqual(INTERNET_USERS_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la busqueda de usuarios';
    InternetRepositoryMock.getByProvider.mockReturnValue(throwError(() => new Error(errorMessage)));
    await expect(firstValueFrom(useCase.execute(provider, countUsers))).rejects.toThrow(errorMessage);
  });

});