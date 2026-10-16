import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { GetAllInternetUsersUseCase } from '../../../core/application/usecases/get-all-internet-users.usecase';
import { GetInternetUserByIdUseCase } from '../../../core/application/usecases/get-internet-user-by-id.usecase';
import { GetInternetUsersByProviderUseCase } from '../../../core/application/usecases/get-internet-users-by-provider.usecase';
import { INTERNET_USERS_MOCK } from '../../../mocks/internet.mocks';
import { InternetDetailComponent } from '../../components/internet-detail/internet-detail.component';
import { InternetTableComponent } from '../../components/internet-table/internet-table.component';
import { InternetPage } from './internet.page';

describe('InternetPage', () => {
  let component: InternetPage;
  let fixture: ComponentFixture<InternetPage>;

  const GetAllUseCaseMock = { execute: jest.fn() };
  const GetByIdUseCaseMock = { execute: jest.fn() };
  const GetByProviderUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternetPage],
    })
    .overrideComponent(InternetPage, {
      set: {
        providers: [
          { provide: GetAllInternetUsersUseCase, useValue: GetAllUseCaseMock },
          { provide: GetInternetUserByIdUseCase, useValue: GetByIdUseCaseMock },
          { provide: GetInternetUsersByProviderUseCase, useValue: GetByProviderUseCaseMock },
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternetPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente en estado init', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.detailState).toBe('init');
    expect(component.users).toEqual([]);
  });

  it('debe cargar todos los usuarios al iniciar', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(INTERNET_USERS_MOCK));
    fixture.detectChanges();
    expect(GetAllUseCaseMock.execute).toHaveBeenCalledWith(10);
    expect(component.users).toEqual(INTERNET_USERS_MOCK);
    expect(component.state).toBe('success');
    expect(fixture.debugElement.query(By.directive(InternetTableComponent))).toBeTruthy();
  });

  it('debe pasar a error si falla el listado', () => {
    GetAllUseCaseMock.execute.mockReturnValue(throwError(() => new Error('error')));
    fixture.detectChanges();
    expect(component.users).toEqual([]);
    expect(component.state).toBe('error');
  });

  it('debe filtrar por proveedor con GetInternetUsersByProviderUseCase', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(INTERNET_USERS_MOCK));
    GetByProviderUseCaseMock.execute.mockReturnValue(of([INTERNET_USERS_MOCK[0]]));
    fixture.detectChanges();

    component.onFilter('gmail.com');

    expect(GetByProviderUseCaseMock.execute).toHaveBeenCalledWith('gmail.com', 10);
    expect(component.selectedFilter).toBe('gmail.com');
    expect(component.users).toEqual([INTERNET_USERS_MOCK[0]]);
    expect(component.state).toBe('success');
  });

  it('debe pasar a error si falla el filtro por proveedor', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(INTERNET_USERS_MOCK));
    GetByProviderUseCaseMock.execute.mockReturnValue(throwError(() => new Error('error')));
    fixture.detectChanges();

    component.onFilter('yahoo.com');

    expect(component.state).toBe('error');
  });

  it('debe volver a cargar todos con el filtro "Todos"', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(INTERNET_USERS_MOCK));
    fixture.detectChanges();

    component.onFilter('all');

    expect(GetAllUseCaseMock.execute).toHaveBeenCalledTimes(2);
    expect(component.selectedFilter).toBe('all');
  });

  it('debe cargar el detalle con GetInternetUserByIdUseCase', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(INTERNET_USERS_MOCK));
    GetByIdUseCaseMock.execute.mockReturnValue(of(INTERNET_USERS_MOCK[0]));
    fixture.detectChanges();

    component.onSelect(1);
    fixture.detectChanges();

    expect(GetByIdUseCaseMock.execute).toHaveBeenCalledWith(1);
    expect(component.selectedUser).toEqual(INTERNET_USERS_MOCK[0]);
    expect(component.detailState).toBe('success');
    expect(fixture.debugElement.query(By.directive(InternetDetailComponent))).toBeTruthy();
  });

  it('debe pasar a error si falla el detalle', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(INTERNET_USERS_MOCK));
    GetByIdUseCaseMock.execute.mockReturnValue(throwError(() => new Error('error')));
    fixture.detectChanges();

    component.onSelect(1);

    expect(component.selectedUser).toBeNull();
    expect(component.detailState).toBe('error');
  });

  it('debe limpiar el detalle al cambiar de filtro', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(INTERNET_USERS_MOCK));
    GetByIdUseCaseMock.execute.mockReturnValue(of(INTERNET_USERS_MOCK[0]));
    fixture.detectChanges();
    component.onSelect(1);

    component.onFilter('all');

    expect(component.selectedUser).toBeNull();
    expect(component.detailState).toBe('init');
  });

  it('debe mostrar el título según el filtro', () => {
    expect(component.listTitle).toBe('Listar todos los usuarios');
    component.selectedFilter = 'gmail.com';
    expect(component.listTitle).toBe('Filtrar por dominio: gmail.com');
  });

  it('debe buscar por id con GetInternetUserByIdUseCase', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(INTERNET_USERS_MOCK));
    GetByIdUseCaseMock.execute.mockReturnValue(of(INTERNET_USERS_MOCK[1]));
    fixture.detectChanges();

    component.onSearch('2');

    expect(GetByIdUseCaseMock.execute).toHaveBeenCalledWith(2);
    expect(component.selectedUser).toEqual(INTERNET_USERS_MOCK[1]);
    expect(component.detailState).toBe('success');
  });

  it('no debe llamar al caso de uso si el id no es válido', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(INTERNET_USERS_MOCK));
    fixture.detectChanges();

    for (const value of ['', 'abc', '0', '-3', '2.5']) {
      component.onSearch(value);
      expect(component.detailState).toBe('error');
      expect(component.selectedUser).toBeNull();
    }

    expect(GetByIdUseCaseMock.execute).not.toHaveBeenCalled();
    expect(component.detailErrorText).toBe('Escribe un id válido (número entero mayor que 0)');
  });

  it('debe buscar al pulsar Enter en el campo del id', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(INTERNET_USERS_MOCK));
    GetByIdUseCaseMock.execute.mockReturnValue(of(INTERNET_USERS_MOCK[0]));
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = '1';
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));

    expect(GetByIdUseCaseMock.execute).toHaveBeenCalledWith(1);
  });
});