import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { INTERNET_USERS_MOCK } from '../../../mocks/internet.mocks';
import { InternetService } from './internet.service';

describe('InternetService', () => {
  let service: InternetService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.baseUrlInternet}/api/internet`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(InternetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no queden peticiones HTTP pendientes
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe pedir el listado de usuarios', () => {
    service.getAllUsers(5).subscribe((users) => {
      expect(users).toEqual(INTERNET_USERS_MOCK);
    });
    const req = httpMock.expectOne(`${apiUrl}/5`);
    expect(req.request.method).toBe('GET');
    req.flush(INTERNET_USERS_MOCK);
  });

  it('debe pedir un usuario por id', () => {
    service.getUserById(1).subscribe((user) => {
      expect(user).toEqual(INTERNET_USERS_MOCK[0]);
    });
    const req = httpMock.expectOne(`${apiUrl}/detail/1`);
    expect(req.request.method).toBe('GET');
    req.flush(INTERNET_USERS_MOCK[0]);
  });

  it('debe pedir los usuarios de un proveedor', () => {
    service.getUsersByProvider('gmail.com', 5).subscribe((users) => {
      expect(users).toEqual(INTERNET_USERS_MOCK);
    });
    const req = httpMock.expectOne(`${apiUrl}/provider/gmail.com/5`);
    expect(req.request.method).toBe('GET');
    req.flush(INTERNET_USERS_MOCK);
  });

  it('debe propagar el error si la petición falla', () => {
    service.getAllUsers(3).subscribe({
      next: () => fail('No debería emitir datos cuando ocurre un error'),
      error: (error) => expect(error.status).toBe(500),
    });
    const req = httpMock.expectOne(`${apiUrl}/3`);
    req.flush({ error: 'Internal Server error' }, { status: 500, statusText: 'Internal Server Error' });
  });
});