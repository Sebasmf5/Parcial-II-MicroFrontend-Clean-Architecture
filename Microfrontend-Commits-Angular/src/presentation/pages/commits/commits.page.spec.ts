import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, Subject, throwError } from 'rxjs';
import { GetAllCommitsUseCase } from '../../../app/core/application/usecases/get-all-commits.usecase';
import { GetCommitByHashUseCase } from '../../../app/core/application/usecases/get-commit-by-hash.usecase';
import { GetCommitsByAuthorEmailUseCase } from '../../../app/core/application/usecases/get-commits-by-author-email.usecase';
import { mockCommits } from '../../../app/mocks/commits.mock';
import { CommitsPage, MIN_LOADING_MS } from './commits.page';

describe('CommitsPage', () => {
  let component: CommitsPage;
  let fixture: ComponentFixture<CommitsPage>;

  const getAllMock = { execute: jest.fn() };
  const getByHashMock = { execute: jest.fn() };
  const getByEmailMock = { execute: jest.fn() };

  /** Avanza el reloj simulado lo necesario para que termine el tiempo mínimo de carga. */
  const esperarCarga = () => jest.advanceTimersByTime(MIN_LOADING_MS);

  beforeEach(async () => {
    jest.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [CommitsPage],
    })
      .overrideComponent(CommitsPage, {
        set: {
          providers: [
            { provide: GetAllCommitsUseCase, useValue: getAllMock },
            { provide: GetCommitByHashUseCase, useValue: getByHashMock },
            { provide: GetCommitsByAuthorEmailUseCase, useValue: getByEmailMock },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CommitsPage);
    component = fixture.componentInstance;
  });

  afterEach(() => jest.useRealTimers());

  it('debería crear el componente con el estado inicial', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.commits).toEqual([]);
    expect(component.hash).toBe('');
    expect(component.email).toBe('');
  });

  describe('Carga inicial (caso de uso 1)', () => {
    it('debería cargar todos los commits y pasar a "success"', () => {
      getAllMock.execute.mockReturnValue(of(mockCommits));

      fixture.detectChanges();
      esperarCarga();

      expect(getAllMock.execute).toHaveBeenCalledTimes(1);
      expect(component.commits).toEqual(mockCommits);
      expect(component.state).toBe('success');
    });

    it('debería mantener el estado "loading" aunque la respuesta llegue al instante', () => {
      getAllMock.execute.mockReturnValue(of(mockCommits));

      fixture.detectChanges();
      jest.advanceTimersByTime(MIN_LOADING_MS - 1);

      expect(component.state).toBe('loading');
      expect(component.commits).toEqual([]);

      jest.advanceTimersByTime(1);

      expect(component.state).toBe('success');
    });

    it('debería mostrar la alerta "Cargando commits..." mientras se espera la respuesta', () => {
      getAllMock.execute.mockReturnValue(of(mockCommits));

      fixture.detectChanges();

      const alert = fixture.debugElement.query(By.css('app-alert'));
      expect(alert).toBeTruthy();
      expect(alert.nativeElement.textContent).toContain('Cargando commits...');
      expect(fixture.debugElement.query(By.css('app-commit-table'))).toBeNull();
    });

    it('debería esperar también a la respuesta lenta del backend', () => {
      const respuesta = new Subject<typeof mockCommits>();
      getAllMock.execute.mockReturnValue(respuesta);

      fixture.detectChanges();
      esperarCarga();

      // Ya pasó el tiempo mínimo, pero el backend todavía no responde.
      expect(component.state).toBe('loading');

      respuesta.next(mockCommits);
      respuesta.complete();
      fixture.detectChanges();

      expect(component.state).toBe('success');
      expect(fixture.debugElement.query(By.css('app-alert'))).toBeNull();
      expect(fixture.debugElement.query(By.css('app-commit-table'))).toBeTruthy();
    });

    it('debería pasar a "error" si falla la carga', () => {
      getAllMock.execute.mockReturnValue(throwError(() => new Error('error')));

      fixture.detectChanges();
      esperarCarga();

      expect(component.commits).toEqual([]);
      expect(component.state).toBe('error');
    });

    it('debería mostrar la tabla cuando el estado es "success"', () => {
      getAllMock.execute.mockReturnValue(of(mockCommits));

      fixture.detectChanges();
      esperarCarga();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('app-commit-table'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('app-alert'))).toBeNull();
    });

    it('debería mostrar la alerta de error cuando el estado es "error"', () => {
      getAllMock.execute.mockReturnValue(throwError(() => new Error('error')));

      fixture.detectChanges();
      esperarCarga();
      fixture.detectChanges();

      const alert = fixture.debugElement.query(By.css('app-alert'));
      expect(alert).toBeTruthy();
      expect(alert.nativeElement.textContent).toContain('Error al cargar los commits');
      expect(fixture.debugElement.query(By.css('app-commit-table'))).toBeNull();
    });
  });

  describe('loadAll()', () => {
    it('debería limpiar los filtros y volver a cargar todos los commits', () => {
      getAllMock.execute.mockReturnValue(of(mockCommits));
      component.hash = '0000001';
      component.email = 'laura.gomez@example.com';

      component.loadAll();

      expect(component.hash).toBe('');
      expect(component.email).toBe('');
      expect(component.state).toBe('loading');

      esperarCarga();

      expect(component.commits).toEqual(mockCommits);
      expect(component.state).toBe('success');
    });
  });

  describe('filterByHash() (caso de uso 2)', () => {
    it('debería cargar todos los commits si el hash está vacío', () => {
      getAllMock.execute.mockReturnValue(of(mockCommits));
      component.hash = '   ';

      component.filterByHash();
      esperarCarga();

      expect(getByHashMock.execute).not.toHaveBeenCalled();
      expect(getAllMock.execute).toHaveBeenCalledTimes(1);
      expect(component.commits).toEqual(mockCommits);
    });

    it('debería mostrar solo el commit encontrado', () => {
      getByHashMock.execute.mockReturnValue(of(mockCommits[0]));
      component.hash = ' 0000001 ';

      component.filterByHash();

      expect(component.state).toBe('loading');
      esperarCarga();

      expect(getByHashMock.execute).toHaveBeenCalledWith('0000001');
      expect(component.commits).toEqual([mockCommits[0]]);
      expect(component.state).toBe('success');
    });

    it('debería dejar la lista vacía si el caso de uso no devuelve commit', () => {
      getByHashMock.execute.mockReturnValue(of(null));
      component.hash = '0000009';

      component.filterByHash();
      esperarCarga();

      expect(component.commits).toEqual([]);
      expect(component.state).toBe('success');
    });

    it('debería pasar a "error" si el commit no existe', () => {
      getByHashMock.execute.mockReturnValue(throwError(() => new Error('Commit not found')));
      component.hash = 'no-existe';

      component.filterByHash();
      esperarCarga();

      expect(component.state).toBe('error');
    });
  });

  describe('filterByEmail() (caso de uso 3)', () => {
    it('debería cargar todos los commits si el correo está vacío', () => {
      getAllMock.execute.mockReturnValue(of(mockCommits));
      component.email = '';

      component.filterByEmail();
      esperarCarga();

      expect(getByEmailMock.execute).not.toHaveBeenCalled();
      expect(getAllMock.execute).toHaveBeenCalledTimes(1);
    });

    it('debería mostrar los commits del autor', () => {
      const email = 'laura.gomez@example.com';
      const esperado = mockCommits.filter((commit) => commit.authorEmail === email);
      getByEmailMock.execute.mockReturnValue(of(esperado));
      component.email = ` ${email} `;

      component.filterByEmail();

      expect(component.state).toBe('loading');
      esperarCarga();

      expect(getByEmailMock.execute).toHaveBeenCalledWith(email);
      expect(component.commits).toEqual(esperado);
      expect(component.state).toBe('success');
    });

    it('debería pasar a "error" si falla el filtro', () => {
      getByEmailMock.execute.mockReturnValue(throwError(() => new Error('error')));
      component.email = 'laura.gomez@example.com';

      component.filterByEmail();
      esperarCarga();

      expect(component.state).toBe('error');
    });
  });
});
