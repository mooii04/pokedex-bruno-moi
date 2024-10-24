import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { ItemsComponent } from './components/items/items.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MovesComponent } from './components/moves/moves.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { MovesDetailsComponent } from './components/moves-details/moves-details.component';

const routes: Routes = [
  {path: 'pokedex', component: PokedexComponent},
  {path: 'items', component: ItemsComponent},
  {path: 'moves', component: MovesComponent},
  {path: 'pokemon-detail/:id', component: PokemonComponent},
  {path: 'item-detail/:id', component: ItemDetailsComponent},
  {path: 'move-detail/:id', component: MovesDetailsComponent},
  {path: '', redirectTo: '/pokedex', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
