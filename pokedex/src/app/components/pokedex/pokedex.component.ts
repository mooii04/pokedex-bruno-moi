import { Component, OnInit } from '@angular/core';
import { Pokedex } from '../../models/pokedex.interface';
import { PokedexService } from '../../services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent implements OnInit {

  listadoPokemon: Pokedex[] = [];

  constructor(private pokedexService : PokedexService) { }

  ngOnInit(): void {
    this.pokedexService.getPoxedex().subscribe(respuesta => {
      this.listadoPokemon = respuesta.results;
    });
  }

}
