import { TestBed, inject } from '@angular/core/testing';

import { EditPlaylistProviderService } from './edit-playlist-provider.service';
import { UserService } from '../../../core/user.service';
import { EditPlaylistService } from '../services/edit-playlist.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';

describe('EditPlaylistProviderService', () => {
  const userServiceSpy = jasmine.createSpyObj('UserService', ['setUser', 'observeUser']);
  const editPlaylistServiceSpy = jasmine.createSpyObj('EditPlaylistService', ['remove', 'add', 'getPlaylistMusics']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [EditPlaylistProviderService, UserService, EditPlaylistService]
    });
  });

  it('should be created', inject([EditPlaylistProviderService], (service: EditPlaylistProviderService) => {
    expect(service).toBeTruthy();
  }));
});
