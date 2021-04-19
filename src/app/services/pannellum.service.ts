import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import $ from 'jquery';
import { BehaviorSubject } from 'rxjs';
import { CustomHotspot, InfoHotspot, SceneHotspot } from '../models/hotspot';
import { ModalComponent } from '../virtual-museum/modal/modal.component';
import { ApiService } from './api.service';


declare var pannellum

@Injectable({
  providedIn: 'root'
})
export class PannellumService {

  pannellumViewer: any;
  sceneJson: Object = {};
  scenes: Array<string> = [];
  mouseToogle: boolean = false;
  activeScene: string;
  customFunction: boolean;

  // Para Agregar un nuevo hotspot
  hotspotType: string;
  nextAddHotspot: CustomHotspot | SceneHotspot | InfoHotspot;

  private _activeScene = new BehaviorSubject<string>(null);

  get selectedScene() {
    return this._activeScene.asObservable();
  }

  constructor(
    public dialog: MatDialog,
    public apiServive: ApiService

  ) { }

  /**
   * generateId
   * 
   * Generar un id totalmente random para manjear los hotspot a traves de la API de Pannellum
   * @param id id del elemento 
   * @returns newId, el nuevo id generado aleatoreamente
   */
  private generateId(id: string) {
    //  existe el id, usar ese
    if (id)
      return id;

    // Crear un nuevo id con la estructura 'tc-xxxx'
    let newId = 'tc-' + String(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);

    return newId

  }

  /**
   * constructScenes
   *
   * Construir las escenas a partir de un archivo de configuracion
   * @param config Json que viene del archivo de configuracion con los parametros del tour
   * @returns sceneJson, el json formateado de manera que sea legible para pannellum para poder construir el tour
   */
  public constructScenes(config) {

    // leer el archivo de configuracion
    // Construir cada Escena
    this.sceneJson = {};
    config.escenas.forEach(
      escena => {
        // Guardar el orden de las escenas
        this.scenes.push(escena['id'])

        // Construir cada Hotspot con la config
        let hotspotsArray = [];
        escena.hotspots.forEach(
          hotspot => {

            // Crear los hotspot segun el tipo
            let type = hotspot['tipo']
            let aux;

            // Usar el id o generarlo en caso de no especificarlo
            let id = this.generateId(hotspot['id_hotspot'])
            
            // SCENE HOTSPOT
            if (type == "scene") {
              aux = {
                'id': id,
                'pitch': hotspot['valor_angulo_y'],
                'yaw': hotspot['valor_angulo_x'],
                'text': hotspot['titulo'],
                'type': hotspot['tipo'],
                'sceneId': hotspot['id_escena'],
                'targetYaw': hotspot['targetYaw'] || -23,
                'targetPitch': hotspot['targetPitch'] || 2,
                'cssClass': hotspot['clase_css'],
              }

              if ( hotspot['icono'] ){
                aux.createTooltipFunc = this.hotspot.bind(this),
                aux.createTooltipArgs= {
                    'title': hotspot['titulo'],
                    'id': hotspot['id_hotspot'],
                    'customIcon': {
                      'src': hotspot['icono'] || null,
                      'alt': hotspot['attr_alt'] || null,
                      'width': hotspot['ancho_icono'] || null,
                      'height': hotspot['altura_icono'] || null,
                    }
                  }
                
              }
            }

            // INFO HOTSPOT
            else if (type == "info") {
              aux = {
                'id': id,
                'pitch': hotspot['valor_angulo_y'],
                'yaw': hotspot['valor_angulo_x'],
                'text': hotspot['titulo'],
                'type': hotspot['tipo'],
                "URL": hotspot['url'],
                'sceneId': hotspot['id_escena'],
                'cssClass': hotspot['clase_css'],
              }
            }
            // CUSTOM HOTSPOT
            else {
              aux = {
                'id': id,
                'pitch': hotspot['valor_angulo_y'],
                'yaw': hotspot['valor_angulo_x'],
                'text': hotspot['titulo'],
                'sceneId': hotspot['id_escena'],
                'targetYaw': hotspot['targetYaw'] || -23,
                'targetPitch': hotspot['targetPitch'] || 2,
                'cssClass': hotspot['clase_css'],
                'createTooltipFunc': this.hotspot.bind(this),
                'createTooltipArgs': {
                  'title': hotspot['titulo'],
                  'id': hotspot['id_hotspot'],
                  'customIcon': {
                    'src': hotspot['icono'] || null,
                    'alt': hotspot['attr_alt'] || null,
                    'width': hotspot['ancho_icono'] || null,
                    'height': hotspot['altura_icono'] || null,
                  }
                }
              }
            }

            if(hotspot['mostrar_modal']=='local'){
              aux.createTooltipArgs.modal = {
                  'title': hotspot['titulo_modal'] || null,
                  'description': hotspot['descripcion_modal'] || null,
                  'imagen': {
                    'src': hotspot['imagen_modal'] || null,
                    'alt': hotspot['attr_alt'] || null,
                    'width': hotspot['ancho_imagen'] || null,
                    'height': hotspot['altura_imagen'] || null,
                  }
              }
            }else if (hotspot['mostrar_modal']=='db') {
              this.apiServive.getArtefact(hotspot['id_obra']).subscribe(
                data =>{
                  aux.createTooltipArgs.modal = {
                    'title': data.result[0].artifactLabel.value || null,
                    'description': data.result[0].note.value || null,
                    'imagen': {
                      'src': hotspot['imagen_modal'] || null,
                      'alt': hotspot['attr_alt'] || null,
                      'width': hotspot['ancho_imagen'] || null,
                      'height': hotspot['altura_imagen'] || null,
                    }
                }
                  
                }
              );
            }
            
            // Agregar el hotspot al array
            hotspotsArray.push(aux)
          }
        )

        // Construccion de la Scena
        let escenaAux = {
          "title": escena['titulo'],
          "hfov": escena['hfov'] || 110,
          "yaw": escena['yaw'] || 150,
          "panorama": escena['img-360'],
          "type": "equirectangular",
          "hotSpots": hotspotsArray,
        }

        this.sceneJson[escena['id']] = escenaAux

      }
    )

    return this.sceneJson
  }


  /**
   * initPannellum
   *
   * iniciar pannellum
   * @param panoramaHTML id del elemento panorama en el DOM
   * @param viewId primera escena a mostrar
   * @param sceneJson json formateado de manera que sea legible para pannellum para poder construir el tour
   * @param edit determina si el tour sera editable o no
   */
  public initPannellum(panoramaHTML, viewId, sceneJson, edit = null) {

    console.info("Iniciando pannellum");

    // Guardar la escena activa
    this.activeScene = viewId

    // Iniciar pannellum
    this.pannellumViewer = pannellum.viewer(panoramaHTML, {
      "showFullscreenCtrl": true,
      "autoLoad": true,
      "multiResMinHfov": true,
      "default": {
        "firstScene": viewId,
        "sceneFadeDuration": 1000
      },
      "scenes": sceneJson
    })


    // Activar los eventos para agregar hotspots
    if (edit) {

      // Evento para click del mouse agregar un nuevo hotspot
      this.pannellumViewer.on('mousedown',
        (e) => {
          if (this.mouseToogle) {
            let a = this.pannellumViewer.mouseEventToCoords(e);
            // console.log(a);
            this.toogleAddHotspot(false)
            this.addHotspot(a)
          }
        }
      );

    }
  }

  /**
   * toogleAddHotspot
   * Activar el evento de click
   * 
   * @param b booleano para activar el evento click
   */
  public toogleAddHotspot(b: boolean) {

    this.mouseToogle = b;
  }

  /**
   * enableAddHotspot
   * Al agregar un hotspot en el toolCreator, se guardan las configuraciones y habilitar el evento click
   * @param hotspotType El tipo del hostpot
   * @param hotspot El hotspot 
   * @param customFun para usar la funcion custom o no
   */
  public enableAddHotspot(hotspotType, hotspot, customFun = false) {

    // Activar el evento
    this.toogleAddHotspot(true)

    // Guardar el tipo de hotspot
    this.hotspotType = hotspotType;

    // hotspot
    this.nextAddHotspot = hotspot;

    // Si se va a usar la funcion custom
    this.customFunction = customFun

  }

  /**
   * getInitialScene
   *  Devuelve el la scena solicitada
   * 
   * @param index indice de la escena 
   * @returns escena o null, segun exista el indice
   */
  public getInitialScene(index: number) {
    console.log(this.scenes);

    if (this.scenes.length > index)
      return this.scenes[index]
    return null
  }


  /**
   * addHotspot
   * Agregar el hotspot
   * @param coords Coordenadas donde se dio click para agregar el hotspot
   */
  public addHotspot(coords: Array<number>) {

    console.log(this.nextAddHotspot);
    

    // Coordenadas
    let pitch = coords[0];
    let yaw = coords[1];
    this.nextAddHotspot.pitch = pitch;
    this.nextAddHotspot.yaw = yaw;

    // Agregar ID si no tiene
    this.nextAddHotspot.id = this.generateId(this.nextAddHotspot.id)


    if (this.customFunction ){
      // Agregar la funcion custom
      this.nextAddHotspot.createTooltipFunc = this.hotspot.bind(this)

      // guardar el mismo id
      this.nextAddHotspot.createTooltipArgs.id = this.nextAddHotspot.id
    }

    // Agregar el hotspot
    this.pannellumViewer.addHotSpot(this.nextAddHotspot, this.activeScene)

    console.log(this.sceneJson);
    
  }

  /**
   * removeHotspot
   * Eliminar hotspot
   * @param id Id del hotspot a eliminar
   */
  public removeHotspot(id: string) {

    this.pannellumViewer.removeHotSpot(id, this.activeScene)
    console.log(this.sceneJson);
    
  }

  /**
   * getScenes
   * DEvuelve las escenas 
   * @returns scenes Escenas del tour
   */
  public getScenes() {
    return this.scenes;
  }

  /**
   * getHotspots
   * Devuelve los hotspots de la escena activa
   * @returns lista de hostspot en caso de existir
   */
  public getHotspots() {
    if ( this.sceneJson ){
      if( this.sceneJson[this.activeScene] ){
        return this.sceneJson[this.activeScene]['hotSpots']
      }
    }
    return []
  }

  /**
   * openModal
   * Prepara la info que se va a mostrar en el Modal
   * @param data Informacion del modal
   */
  public openModal(data) {
    // Search modal
    console.log(`Abriendo Modal de ${data.title}`);

    // Width del modal
    let w = 300;
    let h = 300;
    if(data.imagen){
      // Se calcula en base al width de la imagen.
      w = (data.imagen.width > 800 ? 350 : data.imagen.width + 50) || 300;
      h = (data.imagen.width > 800 ? 350 : data.imagen.width + 50) || 300;
    }


    // Llamar el modal
    const dialogRef = this.dialog.open(ModalComponent, {
      width: w + 'px',
      data: {
        title: data.title,
        description: data.description,
        extra: data.extra,
        image: data.imagen,
        imageWidth: w,
        imageHeight: h
      }
    });


  }

  /**
  * hotspot
  *
  * Funcion de creacion de hotspot custom
  * @param hotSpotDiv div del hotspot
  * @param args Argumentos custom del hotspot
  */
  public hotspot(hotSpotDiv, args) {

    console.log(`Cargando Hotspot ${args.title}`);
    
    // Custom class
    hotSpotDiv.classList.add('custom-tooltip');

    hotSpotDiv.classList.remove('pnlm-hotspot')
    // Custom ID
    hotSpotDiv.id = args.id;


    // Se crea el evento para abrir el modal
    if (args.modal) {
      let modal = document.getElementById(args.id)
      modal.onclick = () => this.openModal(args.modal)
    }

    // Create span element to tooltip
    var span = document.createElement('span');
    span.innerHTML = args.title;
    hotSpotDiv.appendChild(span);
    span.style.width = span.scrollWidth - 20 + 'px';
    span.style.marginLeft = (- (span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 24) + 'px';
    span.style.marginTop = -span.scrollHeight - 12 + 'px';

    span.classList.add('custom-tooltip-span');

    // Se crea el evento para abrir el modal 
    if (args.modal && args.modal.title) {
      let modal = document.getElementById(args.id)
      modal.onclick = () => this.openModal(args.modal)
    }

    // Custom icon
    if (args.customIcon && args.customIcon.src) {
      let width = args.customIcon.width || "50";
      let height = args.customIcon.height || "50";

      $(`#${args.id}`).append(
        `<img src="${args.customIcon.src}" alt="${args.customIcon.alt}" width="${width}" height="${height}">`
      );
    }

  }

  /**
   * OutputJson
   * 
   * Genera un json a patir de las scenas almacenadas
   */
  public OutputJson() {
    
    

  }


  /**
   * setScene 
   * Establece la escena a mostrar
   * @param sceneId id de la escena
   */
  setScene = (sceneId: string): void => {
    this._activeScene.next(sceneId);
  }
}
