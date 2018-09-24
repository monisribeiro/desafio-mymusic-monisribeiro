import { TestBed, inject } from '@angular/core/testing';

import { SearchMusicService } from './search-music.service';
import { EditPlaylistService } from '../services/edit-playlist.service';
import { UserService } from '../../../core/user.service';
import { HttpClientModule } from '@angular/common/http';

describe('SearchMusicService', () => {
  const userServiceSpy = jasmine.createSpyObj('UserService', ['setUser', 'observeUser']);
  const editPlaylistServiceSpy = jasmine.createSpyObj('EditPlaylistService', ['remove', 'add', 'getPlaylistMusics']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SearchMusicService, UserService, EditPlaylistService]
    });
  });

  it('should be created', inject([SearchMusicService], (service: SearchMusicService) => {
    expect(service).toBeTruthy();
  }));
});
