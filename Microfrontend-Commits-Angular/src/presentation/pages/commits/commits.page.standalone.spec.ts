import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { mockCommits } from '../../../app/mocks/commits.mock';
import { CommitsPage, MIN_LOADING_MS } from './commits.page';

/**
 * Simula la carga desde el Host: solo existe lo que el Host provee
 * (HttpClient) y lo que declara la propia página. No se usa app.config.ts.
 */
describe('CommitsPage dentro del Host (sin app.config)', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('debería crearse y cargar los commits con sus propios providers', () => {
    TestBed.configureTestingModule({
      imports: [CommitsPage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const httpMock = TestBed.inject(HttpTestingController);

    const fixture = TestBed.createComponent(CommitsPage);
    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.baseUrlSpringBoot}/commits`);
    req.flush(mockCommits);
    jest.advanceTimersByTime(MIN_LOADING_MS);

    expect(fixture.componentInstance.state).toBe('success');
    expect(fixture.componentInstance.commits).toEqual(mockCommits);
    httpMock.verify();
  });
});
