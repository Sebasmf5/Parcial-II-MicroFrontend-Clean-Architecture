import { TestBed } from "@angular/core/testing";
import { firstValueFrom, of, throwError } from "rxjs";
import { InternetRepository } from "../../domain/repositories/internet.repository";
import { INTERNET_USERS_MOCK } from "../../../mocks/internet.mocks";
import { GetInternetUserByIdUseCase } from "./get-internet-user-by-id.usecase";

describe('GetInternetUserByIdUseCase', () => {
  let useCase: GetInternetUserByIdUseCase;

  const id = 1;
  const InternetRepositoryMock: jest.Mocked<InternetRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getByProvider: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            GetInternetUserByIdUseCase,
            { provide: InternetRepository, useValue: InternetRepositoryMock }
        ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetInternetUserByIdUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetInternetUserByIdUseCase);
  });

  it('debería delegar la llamada al repositorio', async () => {
    InternetRepositoryMock.getById.mockReturnValue(of(INTERNET_USERS_MOCK[0]));
    const result = await firstValueFrom(useCase.execute(id));
    expect(InternetRepositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(InternetRepositoryMock.getById).toHaveBeenCalledWith(id);
    expect(result).toEqual(INTERNET_USERS_MOCK[0]);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la busqueda de usuarios';
    InternetRepositoryMock.getById.mockReturnValue(throwError(() => new Error(errorMessage)));
    await expect(firstValueFrom(useCase.execute(id))).rejects.toThrow(errorMessage);
  });

});