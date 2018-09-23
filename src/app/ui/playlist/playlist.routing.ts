import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistComponent } from './playlist.component';
import { PlaylistProviderService } from './provider/playlist-provider.service';

const appRoutes: Routes = [
    { path: 'playlist', component: PlaylistComponent, runGuardsAndResolvers: 'paramsOrQueryParamsChange',  resolve: {
        playlists: PlaylistProviderService
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
    PlaylistProviderService
  ]
})
export class PlaylistRoutingModule { }
