import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PannellumService } from 'src/app/services/pannellum.service';

@Component({
  selector: 'app-modal_minimap',
  templateUrl: './modal_minimap.component.html',
  styleUrls: ['./modal_minimap.component.scss']
})
export class ModalMinimapComponent implements OnInit {
  selected: string = "Escena a navegar";
  tour = { pins: [], views: [] };
  selectedView: string;
  selectedPin = 0;
  img: HTMLImageElement;
  scenesAvailable = [];
  oldSize = 0;
  newSize = 0;

  constructor(
    public dialogRef: MatDialogRef<ModalMinimapComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.img = this.data.minimapa;
    
    if(this.data.tour_actual){
      this.tour = this.data.tour_actual.result;
    }
    this.oldSize = this.tour.pins.length;
    this.scenesAvailable = this.data.escenas.filter(el => !this.tour.views.includes(el));

  }

  close(){
    // verificamos el tamaño de los arreglos de pines para verificar si se agrego uno nuevo o no
    this.newSize = this.tour.pins.length
    if(this.newSize > this.oldSize){
      this.tour.pins.pop()
    }
    this.dialogRef.close({
      result: this.tour,
    })
  }

  aceptar(){
    // verificamos el tamaño de los arreglos de pines para verificar si se agrego uno nuevo o no
      this.newSize = this.tour.pins.length
    if((this.newSize > this.oldSize) && !(this.selected === "Escena a navegar") ){
      this.tour.views.push(this.selected);
    }
    if((this.newSize > this.oldSize) && this.selected === "Escena a navegar"){
      this.tour.pins.pop()
    }
      this.dialogRef.close({
      result: this.tour,
    })
  }

}
