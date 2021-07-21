import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove_pins',
  templateUrl: './remove_pins.component.html',
  styleUrls: ['./remove_pins.component.scss']
})
export class RemovePinsComponent implements OnInit {
  seleccionado: string = "Pin a eliminar";
  tour = { pins: [], views: [] };
  selectedView: string;
  selectedPin = 0;
  img: HTMLImageElement;
  escenas_disponibles = [];
  tamano_viejo = 0;
  tamano_nuevo = 0;

  constructor(
    public dialogRef: MatDialogRef<RemovePinsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    
      this.tour = this.data.tour_actual.result;

  }

  close(){
    this.dialogRef.close({
      result: this.tour,
    })
  }

  aceptar(){
    if(!(this.seleccionado === "Pin a eliminar")){
      this.tour.pins.splice( parseInt(this.seleccionado), 1 );
      this.tour.views.splice( parseInt(this.seleccionado), 1 );
    }
    this.dialogRef.close({
      result: this.tour,
    })
  }

}
