import { TestBed, inject } from '@angular/core/testing';

import { EditPlaylistService } from './edit-playlist.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('EditPlaylistService', () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete']);
  let editPlaylistService: EditPlaylistService;
  const musicsArray = [{
      'id': 1,
      'nome': 'Let it be',
      'artistaId': '10',
      'artista': {
        'id': '10',
        'nome': 'The Beatles'
      }
    }, {
      'id': '2',
      'nome': 'Hey Jude',
      'artistaId': '20',
      'artista': {
        'id': '20',
        'nome': 'The Beatles'
      }
    }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [EditPlaylistService, HttpClient]
    });

    this.editPlaylistService = new EditPlaylistService(httpClientSpy);
  });

  it('should be created', inject([EditPlaylistService], () => {
    expect(this.editPlaylistService).toBeTruthy();
  }));


  it('should call get playlist music', inject([EditPlaylistService], () => {
    expect(this.editPlaylistService).toBeTruthy();
    const url = '/api/playlists/?user=abdala';
    httpClientSpy.get.and.returnValue(Observable.of({playlistMusicas: musicsArray}));
    this.editPlaylistService.getPlaylistMusics('abdala').subscribe(response => {
      expect(response).toEqual({playlistMusicas: musicsArray});
      expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });

  }));

  it('should call add', inject([EditPlaylistService], () => {
    expect(this.editPlaylistService).toBeTruthy();
    const url = '/api/playlists/1234/musicas';
    httpClientSpy.put.and.returnValue(Observable.of('OK'));
    this.editPlaylistService.add(1234, musicsArray).subscribe(response => {
      expect(httpClientSpy.put).toHaveBeenCalledWith(url, musicsArray);
      expect(response).toEqual('OK');
    });
  }));

  it('should call remove', inject([EditPlaylistService], () => {
    expect(this.editPlaylistService).toBeTruthy();
    const url = '/api/playlists/1234/musicas/2';
    httpClientSpy.delete.and.returnValue(Observable.of('OK'));
    this.editPlaylistService.remove(1234, 2).subscribe(response => {
      expect(response).toEqual('OK');
      expect(httpClientSpy.delete).toHaveBeenCalledWith(url);
    });
  }));

  it('should call search - empty', inject([EditPlaylistService], () => {
    expect(this.editPlaylistService).toBeTruthy();
    this.editPlaylistService.search().subscribe(response => {
      expect(response).toEqual([]);
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  }));

  it('should call search', inject([EditPlaylistService], () => {
    expect(this.editPlaylistService).toBeTruthy();
    const url = '/api/musicas/?filtro=jude';
    this.editPlaylistService.search('jude').subscribe(response => {
      expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });
  }));
});
