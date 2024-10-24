import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokedexResponse } from '../models/pokedex.interface';
import { PokemonResponse } from '../models/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokedex(limit: number): Observable<PokedexResponse> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`) as Observable<PokedexResponse>;
  }

  getPokemonId(id: number): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(`${this.apiUrl}/${id}`);
  }

  

}