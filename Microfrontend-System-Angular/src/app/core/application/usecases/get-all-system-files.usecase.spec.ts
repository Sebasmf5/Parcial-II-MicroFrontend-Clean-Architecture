import { TestBed } from "@angular/core/testing";
import { firstValueFrom, of, throwError } from "rxjs";
import { SystemRepository } from "../../domain/repositories/system.repository";
import { SYSTEM_FILES_MOCK } from "../../../mocks/system.mocks";
import { GetAllSystemFilesUseCase } from "./get-all-system-files.usecase";

describe('GetAllSystemFilesUseCase', () => {
  let useCase: GetAllSystemFilesUseCase;

  const countFiles = 5;
  const SystemRepositoryMock: jest.Mocked<SystemRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getByMimeFamily: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            GetAllSystemFilesUseCase,
            { provide: SystemRepository, useValue: SystemRepositoryMock }
        ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetAllSystemFilesUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllSystemFilesUseCase);
  });

  it('debería delegar la llamada al repositorio', async () => {
    SystemRepositoryMock.getAll.mockReturnValue(of(SYSTEM_FILES_MOCK));
    const result = await firstValueFrom(useCase.execute(countFiles));
    expect(SystemRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(SystemRepositoryMock.getAll).toHaveBeenCalledWith(countFiles);
    expect(result).toEqual(SYSTEM_FILES_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la busqueda de archivos';
    SystemRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));
    await expect(firstValueFrom(useCase.execute(countFiles))).rejects.toThrow(errorMessage);
  });

});