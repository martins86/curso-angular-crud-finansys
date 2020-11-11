import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateroryListComponent } from './caterory-list.component';

describe('CateroryListComponent', () => {
  let component: CateroryListComponent;
  let fixture: ComponentFixture<CateroryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateroryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CateroryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
