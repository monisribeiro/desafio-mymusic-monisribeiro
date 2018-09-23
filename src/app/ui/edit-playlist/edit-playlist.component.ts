import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/user.service';
import { EditPlaylistService } from './services/edit-playlist.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-playlist',
  host: {
    class: 'edit-playlist d-flex'
  },
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.scss']
})
export class EditPlaylistComponent implements OnInit {
  criteria: any;
  playlistId: any;
  allMusics: any;
  allSelected: boolean;
  alert = {message: '', class: '', display: false};

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private editPlaylistService: EditPlaylistService) { }

  public musics: any;

  ngOnInit() {
    this.activatedRoute.data.subscribe(event => {
      this.playlistId = event.musics.id;
      this.musics = event.musics.playlistMusicas;
      this.allMusics = event.allMusics;
    });

    this.activatedRoute.queryParams.subscribe(event => {
      this.criteria = event.search;
    });

    this.observeUser();
  }

  observeUser() {
    this.userService.observeUser().subscribe(response => {
      this.editPlaylistService.getPlaylistMusics(response).subscribe(musicsResponse => {
        this.musics = musicsResponse.playlistMusicas;
      });
    });
  }

  selectMusic(music) {
    music.selected = true;
    this.isAllSelected();
  }

  toggleChecked() {
    this.allSelected = !this.allSelected;
    this.allMusics.forEach(item => item.selected = this.allSelected);
  }

  isAllSelected() {
    this.allSelected = this.allMusics.filter(item => !item.selected).length === 0;
  }

  remove(music) {
    this.editPlaylistService.remove(this.playlistId, music.musica.id).subscribe(response => {
      this.alert.message = 'Música removida com sucesso';
      this.alert.class = 'alert-success';
      this.alert.display = true;
      _.remove(this.musics, item => item.musica.id === music.musica.id);
    }, error => {
      this.alert.message = 'Não foi possível remover a música.';
      this.alert.class = 'alert-danger';
      this.alert.display = true;
    });
  }

  closeAlert() {
    this.alert.display = false;
  }

  addMusic() {
    this.editPlaylistService.add(this.playlistId, this.allMusics.filter(item => item.selected)).subscribe(response => {
      this.alert.message = 'Músicas adicionadas com sucesso';
      this.alert.class = 'alert-success';
      this.alert.display = true;
      this.musics = [...this.musics, ...this.allMusics.filter(item => item.selected).map(item => {
        return  {musica: item};
      })];
    }, error => {
      this.alert.message = 'Não foi possível adicionar as músicas.';
      this.alert.class = 'alert-danger';
      this.alert.display = true;
    });
  }

  limparBusca() {
    this.router.navigate(['/edit-playlist']);
  }
}
