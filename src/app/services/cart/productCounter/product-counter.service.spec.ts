import { TestBed } from '@angular/core/testing';

import { ProductCounterService } from './product-counter.service';

describe('ProductCounterService', () => {
  let service: ProductCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
