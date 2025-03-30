import { TestBed } from '@angular/core/testing';

import { ProductResolveServiceService } from './product-resolve-service.service';

describe('ProductResolveServiceService', () => {
  let service: ProductResolveServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductResolveServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
