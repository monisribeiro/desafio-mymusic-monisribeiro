import { Injectable } from '@angular/core';
import { EditPlaylistService } from '../services/edit-playlist.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../../../core/user.service';

@Injectable()
export class EditPlaylistProviderService {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return  this.editPlaylistService.getPlaylistMusics(this.userService.getUser()).pipe(map(
      response => {
        return response;
    })
  );
  }

  constructor(private editPlaylistService: EditPlaylistService, private userService: UserService ) { }
}
