import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SYSTEM_FILES_MOCK } from '../../../mocks/system.mocks';
import { SystemService } from '../services/system.service';
import { SystemRepositoryImpl } from './system.repository.impl';

describe('SystemRepositoryImpl (Infrastructure)', () => {
  let repository: SystemRepositoryImpl;

  const SystemServiceMock = {
    getAllFiles: jest.fn(),
    getFileById: jest.fn(),
    getFilesByMimeFamily: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SystemRepositoryImpl,
        { provide: SystemService, useValue: SystemServiceMock }
      ]
    });
    repository = TestBed.inject(SystemRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('getAll debe delegar en SystemService.getAllFiles()', (done) => {
    SystemServiceMock.getAllFiles.mockReturnValue(of(SYSTEM_FILES_MOCK));
    repository.getAll(5).subscribe((files) => {
      expect(SystemServiceMock.getAllFiles).toHaveBeenCalledWith(5);
      expect(files).toEqual(SYSTEM_FILES_MOCK);
      done();
    });
  });

  it('getById debe delegar en SystemService.getFileById()', (done) => {
    SystemServiceMock.getFileById.mockReturnValue(of(SYSTEM_FILES_MOCK[0]));
    repository.getById('9b2d6f7e-3c1a-4f5b-8a60-1d2e3f4a5b6c').subscribe((file) => {
      expect(SystemServiceMock.getFileById).toHaveBeenCalledWith('9b2d6f7e-3c1a-4f5b-8a60-1d2e3f4a5b6c');
      expect(file).toEqual(SYSTEM_FILES_MOCK[0]);
      done();
    });
  });

  it('getByMimeFamily debe delegar en SystemService.getFilesByMimeFamily()', (done) => {
    SystemServiceMock.getFilesByMimeFamily.mockReturnValue(of(SYSTEM_FILES_MOCK));
    repository.getByMimeFamily('image', 5).subscribe((files) => {
      expect(SystemServiceMock.getFilesByMimeFamily).toHaveBeenCalledWith('image', 5);
      expect(files).toEqual(SYSTEM_FILES_MOCK);
      done();
    });
  });
});