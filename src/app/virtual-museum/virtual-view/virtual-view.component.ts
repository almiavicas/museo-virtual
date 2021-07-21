import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import $ from 'jquery';
import { config } from './config'
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from 'src/app/services/api.service';
import { PannellumService } from 'src/app/services/pannellum.service';
import { Subscription } from 'rxjs';

declare var pannellum: any;

@Component({
  selector: 'app-virtual-view',
  templateUrl: './virtual-view.component.html',
  styleUrls: ['./virtual-view.component.scss']
})
export class VirtualViewComponent implements OnInit, AfterViewInit {
  @Input() viewId: string;

  // Element ID for pano
  panoramaHTML = 'panorama'

  // Pannellum Viewer
  pannellumViewer;

  constructor(
    public dialog: MatDialog,
    public api: ApiService,
    public pannellumService : PannellumService
  ) { }

  ngOnInit(): void {
    console.log(this.viewId);
  }


  //------------------------------------------------------------
  userRole = this.api.userRole;
  //------------------------------------------------------------



  ngAfterViewInit(): void {
    //  Funciones del pannellum service para crear las escenas y el tour

    let escenas = this.pannellumService.constructScenes(config);

    // Obtener la escene inicial, por defecto el indice 0, es decir la primera escena
    let initialView: string = this.pannellumService.getInitialScene(0);

    // Iniciar pannellum con las escenas obtenidas
    this.pannellumService.initPannellum(this.panoramaHTML, initialView, escenas);

  }
}





