import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PannellumService } from 'src/app/services/pannellum.service';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-img-server',
  templateUrl: './img-server.component.html',
  styleUrls: ['./img-server.component.scss']
})
export class ImgServerComponent implements OnInit {

  seleccionado: string = "Museo a seleccionar";
  selectedView: string;
  selectedPin = 0;
  img: HTMLImageElement;
  imgMuseum: any;
  museums: any;
  active_museum = false;
  final_scene = "";
  active_img = false;
  prueba: string;
  id_museo: string;
  url_scene: string;
  img_selected= false;

  constructor(
    public dialogRef: MatDialogRef<ImgServerComponent>,
    private api: ApiService,
    public pannellumService: PannellumService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.api.getMuseums().subscribe((response) => {
      this.museums = response.result;
      this.active_museum = true;
    }, console.error);
    
  }

  remove(){
    this.dialogRef.close({
      result: true,
    })
  }

  close(){
    this.dialogRef.close({
      result: false,
    })
  }

  search(){
    if(!(this.seleccionado === "Museo a seleccionar")){
      var length_array = this.museums.length;
      var id: string;
      for (let i = 0; i < length_array; i++) {
        if(this.museums[i].label === this.seleccionado){
          id= this.museums[i].id
          this.id_museo = id;
        }
      }
      this.api.getMuseumImg(id).subscribe((response) => {
        this.imgMuseum = response.result;
        this.active_img = true;
      }, console.error);
    }
  }

  urlScene(scene){
    var url = 'data:image/jpg;base64,' + scene.source;
    //this.prueba = scene.source;
    return url;
  }

  goScene(scene){
    this.final_scene = scene.name;
    this.img_selected = true;
  }

  add(){
    var length_array2 = this.imgMuseum.length;
    var source: string;
    for (let i = 0; i < length_array2; i++) {
      if(this.imgMuseum[i].name === this.final_scene){
        source= this.imgMuseum[i].source
        this.url_scene = source;
      }
    }
    this.dialogRef.close({
      
      //result: [this.final_scene,this.id_museo],

      result: this.url_scene,
    })
  }

  /**
   * ---Carousel de escenas---
  */

   index = 0;

  /**
  * moveCarouselRight: Mueve el carousel hacia la derecha
  */
   public moveCarouselRight(){

    this.index++;

    const carousel_width = document.getElementById("carousel-container2").offsetWidth;
    const cards_per_carousel = 3;
    const card_width = carousel_width / cards_per_carousel;

    let translation: number = this.index * card_width;
    document.getElementById("prev2").style.display = "block";                                  // Muestra el botón izquierdo
    document.getElementById("track2").style.transform = "translateX(-"+translation+"px)";      // Mueve el carousel

    // Cuando el carousel llega al final se quita el botón de la derecha
    if (document.getElementById("track2").offsetWidth - (this.index * card_width) <= card_width * cards_per_carousel){
      document.getElementById("next2").style.display = "none";
    }
  }

  /**
  * moveCarouselLeft: Mueve el carousel hacia la izquierda
  */
  public moveCarouselLeft(){

    this.index--;

    const carousel_width = document.getElementById("carousel-container2").offsetWidth;
    const cards_per_carousel = 3;
    const card_width = carousel_width / cards_per_carousel;

    let translation: number = this.index * card_width;
    document.getElementById("next2").style.display = "block";                                  // Muestra el botón derecho
    document.getElementById("track2").style.transform = "translateX(-"+translation+"px)";      // Mueve el carousel

    // Cuando el carousel llega al principio se quita el botón de la izquierda
    if (this.index == 0){
      document.getElementById("prev2").style.display = "none";
    }
  }

}