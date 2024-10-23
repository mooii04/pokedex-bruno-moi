import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokedexResponse } from '../models/pokedex.interface';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private http: HttpClient) { }

  getPoxedex(): Observable<PokedexResponse> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/') as Observable<PokedexResponse>;
}

}