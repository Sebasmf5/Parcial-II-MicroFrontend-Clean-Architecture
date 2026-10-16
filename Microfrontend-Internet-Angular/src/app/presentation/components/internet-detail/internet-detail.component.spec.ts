import { ComponentFixture, TestBed } from '@angular/core/testing';
import { INTERNET_USERS_MOCK } from '../../../mocks/internet.mocks';
import { InternetDetailComponent } from './internet-detail.component';

describe('InternetDetailComponent', () => {
  let component: InternetDetailComponent;
  let fixture: ComponentFixture<InternetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternetDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternetDetailComponent);
    component = fixture.componentInstance;
    component.user = INTERNET_USERS_MOCK[0];
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar los datos del usuario', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Usuario #1');
    expect(text).toContain('Maxwell_OReilly');
    expect(text).toContain('maxwell.oreilly@gmail.com');
    expect(text).toContain('229.151.59.145');
    expect(text).toContain('https://prestigious-trolley.com');
    expect(text).toContain('2026-10-10');
  });
});