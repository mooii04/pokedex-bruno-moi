import { Component } from '@angular/core';
import { MovesService } from '../../services/moves.service';
import { Moves } from '../../models/moves.interface';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css']
})
export class MovesComponent {
  listadoMoves: Moves[] = [];

  constructor(private movesService : MovesService) { }

  ngOnInit(): void {
    this.movesService.getMoves(1002).subscribe(respuesta => {
      this.listadoMoves = respuesta.results;
    });
}

}
