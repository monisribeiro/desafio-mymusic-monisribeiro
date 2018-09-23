import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from './playlist.component';
import { RouterModule } from '@angular/router';
import { PlaylistRoutingModule } from './playlist.routing';
import { PlaylistService } from './services/playlist.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PlaylistRoutingModule
  ],
  declarations: [PlaylistComponent],
  providers: [PlaylistService]
})
export class PlaylistModule { }
