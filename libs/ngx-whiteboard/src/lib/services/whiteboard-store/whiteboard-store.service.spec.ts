import { TestBed } from '@angular/core/testing';

import { WhiteboardStoreService } from './whiteboard-store.service';

describe('WhiteboardStoreService', () => {
  let service: WhiteboardStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhiteboardStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
