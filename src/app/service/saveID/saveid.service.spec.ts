import { TestBed } from '@angular/core/testing';

import { SaveidService } from './saveid.service';

describe('SaveidService', () => {
  let service: SaveidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
