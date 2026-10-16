import { TestBed } from "@angular/core/testing";
import { firstValueFrom, of, throwError } from "rxjs";
import { SystemRepository } from "../../domain/repositories/system.repository";
import { SYSTEM_FILES_MOCK } from "../../../mocks/system.mocks";
import { GetSystemFilesByMimeFamilyUseCase } from "./get-system-files-by-mime-family.usecase";

describe('GetSystemFilesByMimeFamilyUseCase', () => {
  let useCase: GetSystemFilesByMimeFamilyUseCase;

  const family = 'image';
  const countFiles = 5;
  const SystemRepositoryMock: jest.Mocked<SystemRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getByMimeFamily: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            GetSystemFilesByMimeFamilyUseCase,
            { provide: SystemRepository, useValue: SystemRepositoryMock }
        ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetSystemFilesByMimeFamilyUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetSystemFilesByMimeFamilyUseCase);
  });

  it('debería delegar la llamada al repositorio', async () => {
    SystemRepositoryMock.getByMimeFamily.mockReturnValue(of(SYSTEM_FILES_MOCK));
    const result = await firstValueFrom(useCase.execute(family, countFiles));
    expect(SystemRepositoryMock.getByMimeFamily).toHaveBeenCalledTimes(1);
    expect(SystemRepositoryMock.getByMimeFamily).toHaveBeenCalledWith(family, countFiles);
    expect(result).toEqual(SYSTEM_FILES_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la busqueda de archivos';
    SystemRepositoryMock.getByMimeFamily.mockReturnValue(throwError(() => new Error(errorMessage)));
    await expect(firstValueFrom(useCase.execute(family, countFiles))).rejects.toThrow(errorMessage);
  });

});