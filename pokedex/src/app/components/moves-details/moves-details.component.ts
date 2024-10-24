import { Component, OnInit } from '@angular/core';
import { MovesDetailsResponse } from '../../models/moves-details.interface';
import { MovesService } from '../../services/moves.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moves-details',
  templateUrl: './moves-details.component.html',
  styleUrl: './moves-details.component.css'
})
export class MovesDetailsComponent implements OnInit{
  
  move: MovesDetailsResponse | undefined;

  constructor(
    private route: ActivatedRoute,
    private movesService : MovesService) { }


    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.movesService.getMoveId(+id).subscribe(response => {
          this.move = response;
        });
      }
    }

}
