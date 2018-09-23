import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPlaylistComponent } from './edit-playlist.component';
import { EditPlaylistProviderService } from './provider/edit-playlist-provider.service';
import { SearchMusicService } from './provider/search-music.service';

const appRoutes: Routes = [
    { path: 'edit-playlist', component: EditPlaylistComponent, runGuardsAndResolvers: 'paramsOrQueryParamsChange',  resolve: {
        musics: EditPlaylistProviderService,
        allMusics: SearchMusicService
      }
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    EditPlaylistProviderService,
    SearchMusicService
  ]
})
export class EditPlaylistRoutingModule { }
