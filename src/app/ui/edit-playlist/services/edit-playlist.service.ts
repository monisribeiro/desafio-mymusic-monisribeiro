import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class EditPlaylistService {

  constructor(private httpClient: HttpClient) { }

  public getPlaylistMusics(user) {
    const url = `/api/playlists/?user=${user}`;
    return this.httpClient.get(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public remove(id, musicaId) {
    const url = `/api/playlists/${id}/musicas/${musicaId}`;
    return this.httpClient.delete(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public add(id, list) {
    const url = `/api/playlists/${id}/musicas`;
    return this.httpClient.put(url, list).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  search(criteria) {
    if (!criteria || criteria === '') {
      return Observable.of([]);
    }
    const url = `/api/musicas/?filtro=${criteria}`;
    return this.httpClient.get(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
