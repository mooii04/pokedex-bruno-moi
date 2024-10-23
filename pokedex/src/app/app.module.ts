import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { MenuComponent } from './shared/menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { ItemsComponent } from './components/items/items.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MovesComponent } from './components/moves/moves.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    MenuComponent,
    PokemonComponent,
    ItemsComponent,
    PageNotFoundComponent,
    MovesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [provideHttpClient (), provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
