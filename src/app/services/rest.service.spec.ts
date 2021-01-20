import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RestService } from './rest.service';

describe('RestService', () => {
  let restService: RestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    });
    restService = TestBed.inject(RestService);
  });

  it('should be created', () => {
    expect(restService).toBeTruthy();
  });
});
