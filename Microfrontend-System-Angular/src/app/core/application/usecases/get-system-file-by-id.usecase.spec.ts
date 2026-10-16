import { TestBed } from "@angular/core/testing";
import { firstValueFrom, of, throwError } from "rxjs";
import { SystemRepository } from "../../domain/repositories/system.repository";
import { SYSTEM_FILES_MOCK } from "../../../mocks/system.mocks";
import { GetSystemFileByIdUseCase } from "./get-system-file-by-id.usecase";

describe('GetSystemFileByIdUseCase', () => {
  let useCase: GetSystemFileByIdUseCase;

  const id = '9b2d6f7e-3c1a-4f5b-8a60-1d2e3f4a5b6c';
  const SystemRepositoryMock: jest.Mocked<SystemRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getByMimeFamily: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            GetSystemFileByIdUseCase,
            { provide: SystemRepository, useValue: SystemRepositoryMock }
        ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetSystemFileByIdUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetSystemFileByIdUseCase);
  });

  it('debería delegar la llamada al repositorio', async () => {
    SystemRepositoryMock.getById.mockReturnValue(of(SYSTEM_FILES_MOCK[0]));
    const result = await firstValueFrom(useCase.execute(id));
    expect(SystemRepositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(SystemRepositoryMock.getById).toHaveBeenCalledWith(id);
    expect(result).toEqual(SYSTEM_FILES_MOCK[0]);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la busqueda de archivos';
    SystemRepositoryMock.getById.mockReturnValue(throwError(() => new Error(errorMessage)));
    await expect(firstValueFrom(useCase.execute(id))).rejects.toThrow(errorMessage);
  });

});