import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { ItemsComponent } from './components/items/items.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MovesComponent } from './components/moves/moves.component';

const routes: Routes = [
  {path: 'pokedex', component: PokedexComponent},
  {path: 'items', component: ItemsComponent},
  {path: 'moves', component: MovesComponent},
  {path: '', redirectTo: '/pokedex', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
