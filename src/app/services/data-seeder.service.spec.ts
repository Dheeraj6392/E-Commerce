import { TestBed } from '@angular/core/testing';

import { DataSeederService } from './data-seeder.service';

describe('DataSeederService', () => {
  let service: DataSeederService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSeederService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
