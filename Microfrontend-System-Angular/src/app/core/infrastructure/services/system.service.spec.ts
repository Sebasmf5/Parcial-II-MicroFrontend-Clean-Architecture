import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { SYSTEM_FILES_MOCK } from '../../../mocks/system.mocks';
import { SystemService } from './system.service';

describe('SystemService', () => {
  let service: SystemService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.baseUrlSystem}/api/system`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(SystemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no queden peticiones HTTP pendientes
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe pedir el listado de archivos', () => {
    service.getAllFiles(5).subscribe((files) => {
      expect(files).toEqual(SYSTEM_FILES_MOCK);
    });
    const req = httpMock.expectOne(`${apiUrl}/5`);
    expect(req.request.method).toBe('GET');
    req.flush(SYSTEM_FILES_MOCK);
  });

  it('debe pedir un archivo por id', () => {
    service.getFileById('9b2d6f7e-3c1a-4f5b-8a60-1d2e3f4a5b6c').subscribe((file) => {
      expect(file).toEqual(SYSTEM_FILES_MOCK[0]);
    });
    const req = httpMock.expectOne(`${apiUrl}/detail/9b2d6f7e-3c1a-4f5b-8a60-1d2e3f4a5b6c`);
    expect(req.request.method).toBe('GET');
    req.flush(SYSTEM_FILES_MOCK[0]);
  });

  it('debe pedir los archivos de una familia MIME', () => {
    service.getFilesByMimeFamily('image', 5).subscribe((files) => {
      expect(files).toEqual(SYSTEM_FILES_MOCK);
    });
    const req = httpMock.expectOne(`${apiUrl}/family/image/5`);
    expect(req.request.method).toBe('GET');
    req.flush(SYSTEM_FILES_MOCK);
  });

  it('debe propagar el error si la petición falla', () => {
    service.getAllFiles(3).subscribe({
      next: () => fail('No debería emitir datos cuando ocurre un error'),
      error: (error) => expect(error.status).toBe(500),
    });
    const req = httpMock.expectOne(`${apiUrl}/3`);
    req.flush({ error: 'Internal Server error' }, { status: 500, statusText: 'Internal Server Error' });
  });
});