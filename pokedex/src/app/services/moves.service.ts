import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovesResponse } from '../models/moves.interface';

@Injectable({
  providedIn: 'root'
})
export class MovesService {

  constructor(private http: HttpClient) { }

  getMoves(limit: number) : Observable<MovesResponse> {
    return this.http.get(`https://pokeapi.co/api/v2/move?limit=${limit}`) as Observable<MovesResponse>;
  }
}