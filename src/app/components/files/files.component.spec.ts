import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilesComponent } from './files.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FilesComponent', () => {
  let component: FilesComponent;
  let fixture: ComponentFixture<FilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesComponent, NavbarComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
