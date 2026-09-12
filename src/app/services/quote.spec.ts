import { TestBed } from '@angular/core/testing';

import { Qoute } from './qoute';

describe('Qoute', () => {
  let service: Qoute;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Qoute);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
