import { TestBed, inject } from '@angular/core/testing';

import { PlaylistProviderService } from './playlist-provider.service';

describe('PlaylistProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaylistProviderService]
    });
  });

  it('should be created', inject([PlaylistProviderService], (service: PlaylistProviderService) => {
    expect(service).toBeTruthy();
  }));
});
