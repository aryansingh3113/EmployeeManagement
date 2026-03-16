import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpRegFormComponent } from './empRegForm.component';

describe('AdmissionComponent', () => {
  let component: EmpRegFormComponent;
  let fixture: ComponentFixture<EmpRegFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpRegFormComponent]
    });
    fixture = TestBed.createComponent(EmpRegFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
