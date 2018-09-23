import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PlaylistService {

  constructor(private httpClient: HttpClient) { }

  public getPlaylists(user) {
    const url = `/api/playlists/?user=${user}`;
    return this.httpClient.get(url).pipe(
      map(response => {
        return response;
      })
    );
  }

}
