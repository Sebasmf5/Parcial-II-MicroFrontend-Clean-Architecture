import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitTable } from './commit-table';

describe('CommitTable', () => {
  let component: CommitTable;
  let fixture: ComponentFixture<CommitTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommitTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
