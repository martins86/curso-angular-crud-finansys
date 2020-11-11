import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateroryFormComponent } from './caterory-form.component';

describe('CateroryFormComponent', () => {
  let component: CateroryFormComponent;
  let fixture: ComponentFixture<CateroryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateroryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CateroryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
