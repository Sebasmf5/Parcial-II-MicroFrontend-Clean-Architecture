import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SYSTEM_FILES_MOCK } from '../../../mocks/system.mocks';
import { SystemTableComponent } from './system-table.component';

describe('SystemTableComponent', () => {
  let component: SystemTableComponent;
  let fixture: ComponentFixture<SystemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una fila por cada archivo', () => {
    component.files = SYSTEM_FILES_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(SYSTEM_FILES_MOCK.length);
  });

  it('debería mostrar los datos del archivo en cada columna', () => {
    component.files = SYSTEM_FILES_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const file = SYSTEM_FILES_MOCK[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(file.id);
      expect(columns[1].nativeElement.textContent.trim()).toBe(file.fileName);
      expect(columns[2].nativeElement.textContent.trim()).toBe(file.mimeType);
      expect(columns[3].nativeElement.textContent.trim()).toBe(file.directoryPath);
      expect(columns[4].nativeElement.textContent.trim()).toBe(component.formatSize(file.size));
      expect(columns[5].nativeElement.textContent.trim()).toBe(file.createdAt);
    });
  });

  it('debería mapear cada familia MIME a su BadgeType correcto', () => {
    expect(component.familyMap['application']).toBe('primary');
    expect(component.familyMap['audio']).toBe('warning');
    expect(component.familyMap['image']).toBe('success');
    expect(component.familyMap['text']).toBe('secondary');
    expect(component.familyMap['video']).toBe('danger');
  });

  it('debería obtener el BadgeType a partir del tipo MIME', () => {
    expect(component.getBadgeType('image/png')).toBe('success');
    expect(component.getBadgeType('application/pdf')).toBe('primary');
  });

  it('debería usar el BadgeType "dark" cuando la familia no está en el mapa', () => {
    expect(component.getBadgeType('font/woff2')).toBe('dark');
  });

  it('debería convertir el tamaño a un texto legible', () => {
    expect(component.formatSize(204800)).toBe('200.0 KB');
  });

  it('debería emitir el id del archivo al pulsar "Ver"', () => {
    component.files = SYSTEM_FILES_MOCK;
    fixture.detectChanges();
    const emitSpy = jest.spyOn(component.selected, 'emit');

    const button = fixture.debugElement.query(By.css('tbody tr button'));
    button.nativeElement.click();

    expect(emitSpy).toHaveBeenCalledWith(SYSTEM_FILES_MOCK[0].id);
  });
});
