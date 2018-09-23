import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/user.service';
import { PlaylistService } from './services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private playlistService: PlaylistService) { }

  public playlists: any;

  ngOnInit() {
    this.activatedRoute.data.subscribe(event => {
      this.playlists = [event.playlists];
    });

    this.observeUser();
  }
  observeUser() {
    this.userService.observeUser().subscribe(response => {
      this.playlistService.getPlaylists(response).subscribe(playlistResponse => {
        this.playlists = [playlistResponse];
      });
    });
  }

}
