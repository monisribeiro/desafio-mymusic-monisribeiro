import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { PlaylistService } from '../services/playlist.service';
import { UserService } from '../../../core/user.service';

@Injectable()
export class PlaylistProviderService implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.playlistService.getPlaylists(this.userService.getUser()).pipe(map(
        response => {
            return response;
      }));
  }

  constructor(private playlistService: PlaylistService, private userService: UserService) { }
}
