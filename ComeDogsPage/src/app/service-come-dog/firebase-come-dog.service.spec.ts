import { TestBed, inject } from '@angular/core/testing';

import { FirebaseComeDogService } from './firebase-come-dog.service';

describe('FirebaseComeDogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseComeDogService]
    });
  });

  it('should be created', inject([FirebaseComeDogService], (service: FirebaseComeDogService) => {
    expect(service).toBeTruthy();
  }));
});
