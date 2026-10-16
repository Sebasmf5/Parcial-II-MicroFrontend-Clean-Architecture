import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mockCommits } from '../../../app/mocks/commits.mock';
import { CommitTable } from './commit-table';

describe('CommitTable', () => {
  let component: CommitTable;
  let fixture: ComponentFixture<CommitTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommitTable],
    }).compileComponents();

    fixture = TestBed.createComponent(CommitTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería iniciar con la lista de commits vacía', () => {
    expect(component.commits).toEqual([]);
  });

  it('debería renderizar una tabla', () => {
    expect(fixture.debugElement.query(By.css('table'))).toBeTruthy();
  });

  it('debería mostrar el mensaje "Sin resultados" cuando no hay commits', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(1);
    expect(rows[0].nativeElement.textContent).toContain('Sin resultados');
  });

  it('debería renderizar una fila por cada commit', () => {
    component.commits = mockCommits;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(mockCommits.length);
  });

  it('debería mostrar los datos del commit en cada columna', () => {
    component.commits = mockCommits;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const commit = mockCommits[index];
      const fecha = new DatePipe('en-US').transform(commit.createdAt, 'dd/MM/yyyy HH:mm');

      expect(columns[0].nativeElement.textContent.trim()).toBe(commit.hash);
      expect(columns[1].nativeElement.textContent.trim()).toBe(commit.message);
      expect(columns[2].nativeElement.textContent).toContain(commit.authorName);
      expect(columns[2].nativeElement.textContent).toContain(commit.authorEmail);
      expect(columns[4].nativeElement.textContent.trim()).toBe(fecha);
      expect(columns[5].nativeElement.textContent.trim()).toBe(commit.files.join(', '));
    });
  });

  it('debería mostrar un badge con el nombre de la rama de cada commit', () => {
    component.commits = mockCommits;
    fixture.detectChanges();

    const badges = fixture.debugElement.queryAll(By.css('dsb-badge-atom'));
    expect(badges.length).toBe(mockCommits.length);
    badges.forEach((badge, index) => {
      expect(badge.nativeElement.textContent).toContain(mockCommits[index].branch);
    });
  });

  it('debería mapear cada rama a su BadgeType correcto', () => {
    expect(component.branchMap['main']).toBe('danger');
    expect(component.branchMap['develop']).toBe('primary');
    expect(component.branchMap['feature/commits']).toBe('success');
    expect(component.branchMap['fix/commit-filter']).toBe('warning');
  });
});
