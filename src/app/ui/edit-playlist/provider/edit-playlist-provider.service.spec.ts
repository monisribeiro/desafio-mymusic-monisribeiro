import { TestBed, inject } from '@angular/core/testing';

import { EditPlaylistProviderService } from './edit-playlist-provider.service';

describe('EditPlaylistProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditPlaylistProviderService]
    });
  });

  it('should be created', inject([EditPlaylistProviderService], (service: EditPlaylistProviderService) => {
    expect(service).toBeTruthy();
  }));
});
