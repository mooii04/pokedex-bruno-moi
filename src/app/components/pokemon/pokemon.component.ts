import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokedexService } from '../../services/pokedex.service';
import { PokemonResponse } from '../../models/pokemon.interface';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemon: PokemonResponse | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokedexService: PokedexService
  ) {}

  getPokemonTypeClass(types: any[]): string {
    if (!types || types.length === 0) {
      return '';
    }

    const primaryType = types[0].type.name;
    return `bg-${primaryType}`;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokedexService.getPokemonId(+id).subscribe(response => {
        this.pokemon = response;
      });
    }
  }
}