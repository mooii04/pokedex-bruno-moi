import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PokedexResponse } from '../models/pokedex.interface';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private http: HttpClient) { }

  getPokedex(limit: number): Observable<PokedexResponse> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`) as Observable<PokedexResponse>;
  }

}