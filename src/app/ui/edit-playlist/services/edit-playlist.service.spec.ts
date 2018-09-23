import { TestBed, inject } from '@angular/core/testing';

import { EditPlaylistService } from './edit-playlist.service';

describe('EditPlaylistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditPlaylistService]
    });
  });

  it('should be created', inject([EditPlaylistService], (service: EditPlaylistService) => {
    expect(service).toBeTruthy();
  }));
});
