import { TestBed } from '@angular/core/testing';

import { PasswordMatchService } from './password-match.service';

describe('PasswordmatchService', () => {
  let service: PasswordMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
