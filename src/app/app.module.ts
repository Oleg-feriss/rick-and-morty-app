import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { CharactersListComponent } from './characters/characters-list/characters-list.component';
import { CharacterItemComponent } from './characters/characters-list/character-item/character-item.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { EpisodesTableComponent } from './episodes/episodes-table/episodes-table.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationsTableComponent } from './locations/locations-table/locations-table.component';
import { MyWatchListComponent } from './my-watch-list/my-watch-list.component';
import { EpisodesToWatchListComponent } from './my-watch-list/episodes-to-watch-list/episodes-to-watch-list.component';
import { EpisodeToWatchItemComponent } from './my-watch-list/episodes-to-watch-list/episode-to-watch-item/episode-to-watch-item.component';
import { ButtonComponent } from './common/button/button.component';
import { HeaderComponent } from './common/header/header.component';
import { InputComponent } from './common/input/input.component';
import { LoaderComponent } from './common/loader/loader.component';
import { ModalComponent } from './common/modal/modal.component';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { TableComponent } from './common/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharactersListComponent,
    CharacterItemComponent,
    EpisodesComponent,
    EpisodesTableComponent,
    LocationsComponent,
    LocationsTableComponent,
    MyWatchListComponent,
    EpisodesToWatchListComponent,
    EpisodeToWatchItemComponent,
    ButtonComponent,
    HeaderComponent,
    InputComponent,
    LoaderComponent,
    ModalComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
