import { TestBed } from '@angular/core/testing';

import { PuppyService } from './puppy.service';

describe('PuppyService', () => {
  let service: PuppyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuppyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
