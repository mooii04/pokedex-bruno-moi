import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Items } from '../../models/items.interface';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit{

  listadoItems: Items[] = [];

  constructor(private itemsService : ItemsService) { }

  ngOnInit(): void {
    this.itemsService.getItems(1002).subscribe(respuesta => {
      this.listadoItems = respuesta.results;
    });
  }

}
