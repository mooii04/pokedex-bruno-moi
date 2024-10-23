import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsResponse } from '../models/items.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItems() : Observable<ItemsResponse> {
    return this.http.get('https://pokeapi.co/api/v2/item') as Observable<ItemsResponse>;
  }
}
