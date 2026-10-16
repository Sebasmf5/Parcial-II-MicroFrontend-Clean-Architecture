import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { INTERNET_USERS_MOCK } from '../../../mocks/internet.mocks';
import { InternetTableComponent } from './internet-table.component';

describe('InternetTableComponent', () => {
  let component: InternetTableComponent;
  let fixture: ComponentFixture<InternetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternetTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una fila por cada usuario', () => {
    component.users = INTERNET_USERS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(INTERNET_USERS_MOCK.length);
  });

  it('debería mostrar los datos del usuario en cada columna', () => {
    component.users = INTERNET_USERS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const user = INTERNET_USERS_MOCK[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(user.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(user.username);
      expect(columns[2].nativeElement.textContent.trim()).toBe(user.email);
      expect(columns[3].nativeElement.textContent.trim()).toBe(user.provider);
      expect(columns[4].nativeElement.textContent.trim()).toBe(user.ipv4);
      expect(columns[5].nativeElement.textContent.trim()).toBe(user.lastLogin);
    });
  });

  it('debería mapear cada proveedor a su BadgeType correcto', () => {
    expect(component.providerMap['gmail.com']).toBe('danger');
    expect(component.providerMap['outlook.com']).toBe('primary');
    expect(component.providerMap['yahoo.com']).toBe('warning');
    expect(component.providerMap['hotmail.com']).toBe('info');
  });

  it('debería emitir el id del usuario al pulsar "Ver"', () => {
    component.users = INTERNET_USERS_MOCK;
    fixture.detectChanges();
    const emitSpy = jest.spyOn(component.selected, 'emit');

    const button = fixture.debugElement.query(By.css('tbody tr button'));
    button.nativeElement.click();

    expect(emitSpy).toHaveBeenCalledWith(INTERNET_USERS_MOCK[0].id);
  });
});