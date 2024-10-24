import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovesResponse } from '../models/moves.interface';
import { MovesDetailsResponse } from '../models/moves-details.interface';

@Injectable({
  providedIn: 'root'
})
export class MovesService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://pokeapi.co/api/v2/item';

  getMoves(limit: number) : Observable<MovesResponse> {
    return this.http.get(`https://pokeapi.co/api/v2/move?limit=${limit}`) as Observable<MovesResponse>;
  }

  getItemId(id: number): Observable<MovesDetailsResponse> {
    return this.http.get<MovesDetailsResponse>(`${this.apiUrl}/${id}`);
  }
}