import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoardComponent } from './new-board.component';

describe('NewBoardComponent', () => {
  let component: NewBoardComponent;
  let fixture: ComponentFixture<NewBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
