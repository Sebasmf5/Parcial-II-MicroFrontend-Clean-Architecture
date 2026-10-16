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
    expect(text).toContain('Archivo #1');
    expect(text).toContain('Maxwell_OReilly');
    expect(text).toContain('maxwell.oreilly@image');
    expect(text).toContain('229.151.59.145');
    expect(text).toContain('https://prestigious-trolley.com');
    expect(text).toContain('2026-10-10');
  });
});