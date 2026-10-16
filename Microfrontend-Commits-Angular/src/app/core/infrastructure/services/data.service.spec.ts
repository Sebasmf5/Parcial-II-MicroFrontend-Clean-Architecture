import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { mockCommits } from '../../../mocks/commits.mock';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  const baseUrl = environment.baseUrlSpringBoot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no queden peticiones HTTP pendientes
    httpMock.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('Datos locales (mocks)', () => {
    it('debería devolver todos los commits locales', async () => {
      const commits = await firstValueFrom(service.getAllCommitsLocal());
      expect(commits).toEqual(mockCommits);
    });

    it('debería devolver una copia del arreglo de mocks y no el original', async () => {
      const commits = await firstValueFrom(service.getAllCommitsLocal());
      expect(commits).not.toBe(mockCommits);
    });

    it('debería devolver un commit local por su hash', async () => {
      const commit = await firstValueFrom(service.getCommitByHashLocal(mockCommits[2].hash));
      expect(commit).toEqual(mockCommits[2]);
    });

    it('debería emitir un error si el hash no existe en los mocks', async () => {
      await expect(firstValueFrom(service.getCommitByHashLocal('no-existe'))).rejects.toThrow('Commit not found: no-existe');
    });

    it('debería filtrar los commits locales por correo del autor', async () => {
      const email = 'laura.gomez@example.com';
      const commits = await firstValueFrom(service.getCommitsByAuthorEmailLocal(email));

      expect(commits.length).toBeGreaterThan(0);
      expect(commits.every((commit) => commit.authorEmail === email)).toBe(true);
    });

    it('debería filtrar por correo sin distinguir mayúsculas y minúsculas', async () => {
      const commits = await firstValueFrom(
        service.getCommitsByAuthorEmailLocal('LAURA.GOMEZ@EXAMPLE.COM'),
      );
      expect(commits.length).toBe(
        mockCommits.filter((commit) => commit.authorEmail === 'laura.gomez@example.com').length,
      );
    });

    it('debería devolver un arreglo vacío si el autor no tiene commits', async () => {
      const commits = await firstValueFrom(service.getCommitsByAuthorEmailLocal('nadie@example.com'));
      expect(commits).toEqual([]);
    });
  });

  describe('Datos desde Spring Boot (HTTP)', () => {
    it('debería obtener todos los commits con GET /commits', () => {
      service.getAllCommitsSpringBoot().subscribe((commits) => {
        expect(commits).toEqual(mockCommits);
      });

      const req = httpMock.expectOne(`${baseUrl}/commits`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCommits);
    });

    it('debería obtener un commit con GET /commits/{hash}', () => {
      const commit = mockCommits[0];

      service.getCommitByHashSpringBoot(commit.hash).subscribe((result) => {
        expect(result).toEqual(commit);
      });

      const req = httpMock.expectOne(`${baseUrl}/commits/${commit.hash}`);
      expect(req.request.method).toBe('GET');
      req.flush(commit);
    });

    it('debería codificar el hash antes de armar la URL', () => {
      service.getCommitByHashSpringBoot('a/b c').subscribe();

      const req = httpMock.expectOne(`${baseUrl}/commits/a%2Fb%20c`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCommits[0]);
    });

    it('debería filtrar por autor con GET /commits/author/{email}', () => {
      const email = 'carlos.perez@example.com';
      const esperado = mockCommits.filter((commit) => commit.authorEmail === email);

      service.getCommitsByAuthorEmailSpringBoot(email).subscribe((result) => {
        expect(result).toEqual(esperado);
      });

      const req = httpMock.expectOne(`${baseUrl}/commits/author/${encodeURIComponent(email)}`);
      expect(req.request.method).toBe('GET');
      req.flush(esperado);
    });

    it('debería propagar el error HTTP del backend', async () => {
      const promesa = firstValueFrom(service.getAllCommitsSpringBoot());

      const req = httpMock.expectOne(`${baseUrl}/commits`);
      req.flush('Error', { status: 500, statusText: 'Server Error' });

      await expect(promesa).rejects.toMatchObject({ status: 500 });
    });
  });
});
