import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDashboardComponent } from './subject-dashboard.component';

describe('SubjectDashboardComponent', () => {
  let component: SubjectDashboardComponent;
  let fixture: ComponentFixture<SubjectDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
