import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { EditPlaylistService } from '../services/edit-playlist.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchMusicService {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return  this.editPlaylistService.search(route.queryParams.search).pipe(map(
      response => {
        return response;
    })
  );
  }

  constructor(private editPlaylistService: EditPlaylistService ) { }

}
