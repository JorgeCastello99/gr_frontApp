import { TestBed } from '@angular/core/testing';

import { DataModService } from './data-mod.service';

describe('DataModService', () => {
  let service: DataModService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataModService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
