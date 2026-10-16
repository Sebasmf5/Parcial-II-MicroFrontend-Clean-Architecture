import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SYSTEM_FILES_MOCK } from '../../../mocks/system.mocks';
import { SystemDetailComponent } from './system-detail.component';

describe('SystemDetailComponent', () => {
  let component: SystemDetailComponent;
  let fixture: ComponentFixture<SystemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemDetailComponent);
    component = fixture.componentInstance;
    component.file = SYSTEM_FILES_MOCK[0];
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar los datos del archivo', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('reporte_anual.pdf');
    expect(text).toContain('9b2d6f7e-3c1a-4f5b-8a60-1d2e3f4a5b6c');
    expect(text).toContain('application/pdf');
    expect(text).toContain('/usr/local/bin');
    expect(text).toContain('200.0 KB');
    expect(text).toContain('2025-08-14');
  });

  it('debería convertir el tamaño a un texto legible', () => {
    expect(component.formatSize(1572864)).toBe('1.5 MB');
  });
});
