import { TestBed } from '@angular/core/testing';

import { SubthemeService } from './subtheme.service';

describe('SubthemeService', () => {
  let service: SubthemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubthemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
