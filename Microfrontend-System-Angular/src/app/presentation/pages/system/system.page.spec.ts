import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { GetAllSystemFilesUseCase } from '../../../core/application/usecases/get-all-system-files.usecase';
import { GetSystemFileByIdUseCase } from '../../../core/application/usecases/get-system-file-by-id.usecase';
import { GetSystemFilesByMimeFamilyUseCase } from '../../../core/application/usecases/get-system-files-by-mime-family.usecase';
import { SYSTEM_FILES_MOCK } from '../../../mocks/system.mocks';
import { SystemDetailComponent } from '../../components/system-detail/system-detail.component';
import { SystemTableComponent } from '../../components/system-table/system-table.component';
import { SystemPage } from './system.page';

describe('SystemPage', () => {
  let component: SystemPage;
  let fixture: ComponentFixture<SystemPage>;

  const GetAllUseCaseMock = { execute: jest.fn() };
  const GetByIdUseCaseMock = { execute: jest.fn() };
  const GetByProviderUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemPage],
    })
    .overrideComponent(SystemPage, {
      set: {
        providers: [
          { provide: GetAllSystemFilesUseCase, useValue: GetAllUseCaseMock },
          { provide: GetSystemFileByIdUseCase, useValue: GetByIdUseCaseMock },
          { provide: GetSystemFilesByMimeFamilyUseCase, useValue: GetByProviderUseCaseMock },
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente en estado init', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.detailState).toBe('init');
    expect(component.files).toEqual([]);
  });

  it('debe cargar todos los archivos al iniciar', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(SYSTEM_FILES_MOCK));
    fixture.detectChanges();
    expect(GetAllUseCaseMock.execute).toHaveBeenCalledWith(10);
    expect(component.files).toEqual(SYSTEM_FILES_MOCK);
    expect(component.state).toBe('success');
    expect(fixture.debugElement.query(By.directive(SystemTableComponent))).toBeTruthy();
  });

  it('debe pasar a error si falla el listado', () => {
    GetAllUseCaseMock.execute.mockReturnValue(throwError(() => new Error('error')));
    fixture.detectChanges();
    expect(component.files).toEqual([]);
    expect(component.state).toBe('error');
  });

  it('debe filtrar por familia MIME con GetSystemFilesByMimeFamilyUseCase', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(SYSTEM_FILES_MOCK));
    GetByProviderUseCaseMock.execute.mockReturnValue(of([SYSTEM_FILES_MOCK[0]]));
    fixture.detectChanges();

    component.onFilter('image');

    expect(GetByProviderUseCaseMock.execute).toHaveBeenCalledWith('image', 10);
    expect(component.selectedFilter).toBe('image');
    expect(component.files).toEqual([SYSTEM_FILES_MOCK[0]]);
    expect(component.state).toBe('success');
  });

  it('debe pasar a error si falla el filtro por familia MIME', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(SYSTEM_FILES_MOCK));
    GetByProviderUseCaseMock.execute.mockReturnValue(throwError(() => new Error('error')));
    fixture.detectChanges();

    component.onFilter('yahoo.com');

    expect(component.state).toBe('error');
  });

  it('debe volver a cargar todos con el filtro "Todos"', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(SYSTEM_FILES_MOCK));
    fixture.detectChanges();

    component.onFilter('all');

    expect(GetAllUseCaseMock.execute).toHaveBeenCalledTimes(2);
    expect(component.selectedFilter).toBe('all');
  });

  it('debe cargar el detalle con GetSystemFileByIdUseCase', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(SYSTEM_FILES_MOCK));
    GetByIdUseCaseMock.execute.mockReturnValue(of(SYSTEM_FILES_MOCK[0]));
    fixture.detectChanges();

    component.onSelect(1);
    fixture.detectChanges();

    expect(GetByIdUseCaseMock.execute).toHaveBeenCalledWith('9b2d6f7e-3c1a-4f5b-8a60-1d2e3f4a5b6c');
    expect(component.selectedUser).toEqual(SYSTEM_FILES_MOCK[0]);
    expect(component.detailState).toBe('success');
    expect(fixture.debugElement.query(By.directive(SystemDetailComponent))).toBeTruthy();
  });

  it('debe pasar a error si falla el detalle', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(SYSTEM_FILES_MOCK));
    GetByIdUseCaseMock.execute.mockReturnValue(throwError(() => new Error('error')));
    fixture.detectChanges();

    component.onSelect(1);

    expect(component.selectedUser).toBeNull();
    expect(component.detailState).toBe('error');
  });

  it('debe limpiar el detalle al cambiar de filtro', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(SYSTEM_FILES_MOCK));
    GetByIdUseCaseMock.execute.mockReturnValue(of(SYSTEM_FILES_MOCK[0]));
    fixture.detectChanges();
    component.onSelect(1);

    component.onFilter('all');

    expect(component.selectedUser).toBeNull();
    expect(component.detailState).toBe('init');
  });

  it('debe mostrar el título según el filtro', () => {
    expect(component.listTitle).toBe('Listar todos los archivos');
    component.selectedFilter = 'image';
    expect(component.listTitle).toBe('Filtrar por dominio: image');
  });

  it('debe buscar por id con GetSystemFileByIdUseCase', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(SYSTEM_FILES_MOCK));
    GetByIdUseCaseMock.execute.mockReturnValue(of(SYSTEM_FILES_MOCK[1]));
    fixture.detectChanges();

    component.onSearch('2');

    expect(GetByIdUseCaseMock.execute).toHaveBeenCalledWith(2);
    expect(component.selectedUser).toEqual(SYSTEM_FILES_MOCK[1]);
    expect(component.detailState).toBe('success');
  });

  it('no debe llamar al caso de uso si el id no es válido', () => {
    GetAllUseCaseMock.execute.mockReturnValue(of(SYSTEM_FILES_MOCK));
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
    GetAllUseCaseMock.execute.mockReturnValue(of(SYSTEM_FILES_MOCK));
    GetByIdUseCaseMock.execute.mockReturnValue(of(SYSTEM_FILES_MOCK[0]));
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = '1';
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));

    expect(GetByIdUseCaseMock.execute).toHaveBeenCalledWith('9b2d6f7e-3c1a-4f5b-8a60-1d2e3f4a5b6c');
  });
});