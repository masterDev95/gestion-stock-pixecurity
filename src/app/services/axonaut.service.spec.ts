import { TestBed } from '@angular/core/testing';

import { AxonautService } from './axonaut.service';

describe('AxonautService', () => {
  let service: AxonautService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AxonautService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
