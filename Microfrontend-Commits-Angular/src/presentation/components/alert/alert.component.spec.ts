import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería tener el texto vacío por defecto', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    expect(component.text).toBe('');
  });

  it('debería aplicar la clase correcta cuando el estado es "loading"', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    expect(component.getClass()).toContain('alert-primary');
  });

  it('debería aplicar la clase correcta cuando el estado es "error"', () => {
    component.alertState = 'error';
    fixture.detectChanges();
    expect(component.getClass()).toContain('alert-danger');
  });

  it('debería mapear correctamente los estados en alertClassMap', () => {
    expect(component.alertClassMap['loading']).toBe('primary');
    expect(component.alertClassMap['error']).toBe('danger');
  });

  it('debería renderizar el texto recibido por input en loading', () => {
    component.alertState = 'loading';
    component.text = 'Cargando datos...';
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Cargando datos...');
  });

  it('debería renderizar el texto recibido por input en error', () => {
    component.alertState = 'error';
    component.text = 'Error al cargar los datos';
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Error al cargar los datos',
    );
  });

  it('debería mostrar el spinner solo cuando el estado es "loading"', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.spinner-border')).not.toBeNull();
    expect(compiled.querySelector('dsb-icon-atom')).toBeNull();
  });

  it('debería mostrar el ícono solo cuando el estado es "error"', () => {
    component.alertState = 'error';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('dsb-icon-atom')).not.toBeNull();
    expect(compiled.querySelector('.spinner-border')).toBeNull();
  });

  it('no debería lanzar errores al llamar getClass con un estado válido', () => {
    component.alertState = 'loading';
    expect(() => component.getClass()).not.toThrow();
  });
});
