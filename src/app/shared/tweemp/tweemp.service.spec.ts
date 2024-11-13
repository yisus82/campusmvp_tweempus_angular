import { TestBed } from '@angular/core/testing';

import { TweempService } from './tweemp.service';

describe('TweempService', () => {
  let service: TweempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
