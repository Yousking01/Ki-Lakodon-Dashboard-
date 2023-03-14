import { TestBed } from '@angular/core/testing';

import { AjoutsiteService } from './ajoutsite.service';

describe('AjoutsiteService', () => {
  let service: AjoutsiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjoutsiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
