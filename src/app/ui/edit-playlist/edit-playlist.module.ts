import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPlaylistComponent } from './edit-playlist.component';
import { EditPlaylistService } from './services/edit-playlist.service';
import { EditPlaylistRoutingModule } from './edit-playlist.routing';

@NgModule({
  imports: [
    CommonModule,
    EditPlaylistRoutingModule
  ],
  declarations: [EditPlaylistComponent],
  providers: [EditPlaylistService]
})
export class EditPlaylistModule { }
