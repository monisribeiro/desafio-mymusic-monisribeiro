import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppInitializerService, appInitializerServiceFactory } from './core/app-initializer.service';
import { AppHttpInterceptor, HTTPStatus } from './core/http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './core/user.service';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { EditPlaylistModule } from './ui/edit-playlist/edit-playlist.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    EditPlaylistModule,
    AppRoutingModule
  ],
  providers: [
    HTTPStatus,
    AppInitializerService,
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerServiceFactory,
      deps: [AppInitializerService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
