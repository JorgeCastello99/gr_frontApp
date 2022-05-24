import { TestBed } from '@angular/core/testing';

import { UseranswerService } from './useranswer.service';

describe('UseranswerService', () => {
  let service: UseranswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseranswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
