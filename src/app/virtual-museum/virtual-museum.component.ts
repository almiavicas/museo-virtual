import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PannellumService } from '../services/pannellum.service';
import { VirtualViewComponent } from './virtual-view/virtual-view.component';

//--------------------------------------------------------
import { ApiService } from 'src/app/services/api.service';
//--------------------------------------------------------



@Component({
  selector: 'app-virtual-museum',
  templateUrl: './virtual-museum.component.html',
  styleUrls: ['./virtual-museum.component.scss']
})
export class VirtualMuseumComponent implements OnInit {
  tour = { pins: [], views: [] };
  selectedView: string;
  selectedPin = 0;
  @ViewChild('virtualView') virtualView: VirtualViewComponent;

  constructor(
    //private pannellumService: PannellumService,
    public pannellumService: PannellumService,

    //--------------------------------------------------
    private api: ApiService,
    //--------------------------------------------------

  ) { }

  ngOnInit(): void {
    const pins = [];
    // caminadora
    pins.push({ x: 15.5, y: 51.5 });
    pins.push({ x: 23.5, y: 51.5 });
    pins.push({ x: 33, y: 51.5 });
    pins.push({ x: 44.5, y: 51.5 });
    pins.push({ x: 56.5, y: 51.5 });
    pins.push({ x: 66, y: 51.5 });
    pins.push({ x: 75.8, y: 52.3 });
    // Puesto 2
    pins.push({ x: 37.3, y: 32 });
    // Puesto 4
    pins.push({ x: 62, y: 32});
    // puesto 7
    pins.push({ x: 84, y: 60 });
    this.tour.pins = pins;
    const views = [];
    views.push('pasillo-1');
    views.push('pasillo-2');
    views.push('pasillo-3');
    views.push('pasillo-4');
    views.push('pasillo-5');
    views.push('pasillo-6');
    views.push('pasillo-7');
    views.push('sala-2');
    views.push('tienda-chocolate');
    views.push('sala-fotografia');
    this.tour.views = views;
    this.selectedView = this.tour.views[0];
  }

  onPinClick = (viewPosition: number): void => {

    this.selectedPin = viewPosition;
    this.selectedView = this.tour.views[viewPosition];


    this.pannellumService.setScene(this.selectedView);
  };


  //--------------------------------------------------------------------
  userRole = this.api.userRole;
  //--------------------------------------------------------------------

  /**
    * hideMinimap
    * Esconde el minimapa del recorrido virtual
    */
  public hideMinimap() {
    document.getElementById("minimap").style.paddingLeft = "1000px";
    document.getElementById("button-show-minimap").style.display = "block";
    document.getElementById("button-hide-minimap").style.display = "none";
  }

  /**
    * showMinimap
    * Muestra el minimapa del recorrido virtual
    */
  public showMinimap() {
    document.getElementById("minimap").style.paddingLeft = "0px";
    document.getElementById("button-show-minimap").style.display = "none";
    document.getElementById("button-hide-minimap").style.display = "block";
  }

  /**
    * closeSceneCarousel()
    * Esconde el carrusel de escenas del recorrido
    */
  public closeSceneCarousel() {
    document.getElementById("carousel").style.height = "0vh";
    document.getElementById("open-carousel").style.display = "block";
    document.getElementById("close-carousel").style.display = "none";
  }

  /**
    * openSceneCarousel()
    * Muestra el carrusel de escenas del recorrido
    */
  public openSceneCarousel() {
    document.getElementById("carousel").style.height = "20vh"
    document.getElementById("open-carousel").style.display = "none";
    document.getElementById("close-carousel").style.display = "block";
  }


  /**
   * ---Carrusel de escenas---
  */

  index = 0;

  /**
    * moveCarouselRight
    * Mueve el carrusel hacia la derecha
    */
  public moveCarouselRight(){

    this.index++;

    const carouselWidth = document.getElementById("carousel-container").offsetWidth;
    const cardsPerCarousel = 5;
    const cardWidth = carouselWidth / cardsPerCarousel;

    let translation: number = this.index * cardWidth;
    document.getElementById("prev").style.display = "block";                                  // Muestra el botón izquierdo
    document.getElementById("track").style.transform = "translateX(-"+translation+"px)";      // Mueve el carrusel

    // Cuando el carrusel llega al final se quita el botón de la derecha
    if (document.getElementById("track").offsetWidth - (this.index * cardWidth) <= cardWidth * cardsPerCarousel){
      document.getElementById("next").style.display = "none";
    }
  }

  /**
    * moveCarouselLeft
    * Mueve el carrusel hacia la izquierda
    */
  public moveCarouselLeft(){

    this.index--;

    const carouselWidth = document.getElementById("carousel-container").offsetWidth;
    const cardsPerCarousel = 5;
    const cardWidth = carouselWidth / cardsPerCarousel;

    let translation: number = this.index * cardWidth;
    document.getElementById("next").style.display = "block";                                  // Muestra el botón derecho
    document.getElementById("track").style.transform = "translateX(-"+translation+"px)";      // Mueve el carrusel

    // Cuando el carrusel llega al principio se quita el botón de la izquierda
    if (this.index == 0){
      document.getElementById("prev").style.display = "none";
    }
  }
}
