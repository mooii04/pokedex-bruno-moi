import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { ItemDetailsResponse } from '../../models/item-details-interface';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit {

  item: ItemDetailsResponse | undefined;

  constructor(
    private route: ActivatedRoute,
    private itemsService : ItemsService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemsService.getItemId(+id).subscribe(response => {
        this.item = response;
      });
    }
  }

}
