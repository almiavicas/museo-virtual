import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import $ from 'jquery';
import { BehaviorSubject } from 'rxjs';
import { CustomHotspot, InfoHotspot, SceneHotspot } from '../models/hotspot';
import { ModalComponent } from '../virtual-museum/modal/modal.component';
import { ApiService } from './api.service';
import {DomSanitizer} from '@angular/platform-browser';
import Ajv, {JSONSchemaType} from "ajv"
import {DefinedError} from "ajv";
const ajv = new Ajv()

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

  schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
      "imagen": {
        "type": "object",
        "properties": {
          "alt": {"type": "string"},
          "height": {"type": "number"},
          "src": {"type": "string"},
          "width": {"type": "number"}
        }
      },
      "modal": {
        "type": "object",
        "properties": {
          "description": {"type": "string"},
          "imagen": {"$ref": "#/definitions/imagen"},
          "title": {"type": "string"},
          "type": {"type": "string"}
        }
      },
      "customIcon": {
        "type": "object",
        "properties": {
          "alt": {"type": "string"},
          "height": {"type": "number"},
          "src": {"type": "string"},
          "width": {"type": "number"}
        }
      },
      "createTooltipArgs": {
        "type": "object",
        "properties": {
          "customIcon":  {"$ref": "#/definitions/customIcon"},
          "id": {"type": "string"},
          "modal": {"$ref": "#/definitions/modal"},
          "title": {"type": "string"}
        }
      },
      "hotspot": {
        "type": "array",
        "items": {
          "properties": {
            "id":  { "type": "string" },
            "sceneId": {"type": "string"},
            "pitch": { "type": "number" },
            "cssClass": { "type": "string" },
            "targetPitch": {"type": "number"},
            "targetYaw": {"type": "number"},
            "text": {"type": "string"},
            "type": {"type": "string"},
            "yaw": {"type": "number"},
            "createTooltipArgs":  { "$ref": "#/definitions/createTooltipArgs"},
            "div": {"type": "string"},
            "url": {"type": "string"}
          },
          "required": ["id"]
        },
        "default": []
      },
      "scenes": {
        "type": "array",
        "items": {
          "properties": {
            "title": {"type": "string"},
            "panorama": {"type": "string"},
            "yaw": {"type": "number"},
            "hotSpots": { "$ref": "#/definitions/hotspot"}
          },
          "required": ["title"]
        },
        "default": []
      }
    },
    "type": "object",
    "properties": {
      "scenes": { "$ref": "#/definitions/scenes" }
    },
    "required": ["scenes"]
  }

  constructor(
    private sanitizer: DomSanitizer,
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
    console.log('config');
    console.log(config);
    
    // leer el archivo de configuracion
    // Construir cada Escena
    this.scenes = [];
    this.sceneJson = {};
    config.scenes.forEach(
      scene => {
        // Guardar el orden de las scenes
        this.scenes.push(scene['id'])

        // Construir cada Hotspot con la config
        let hotspotsArray = [];
        scene.hotSpots.forEach(
          hotspot => {
            // Crear los hotspot segun el tipo
            let aux;

            // Usar el id o generarlo en caso de no especificarlo
            let id = this.generateId(hotspot['id'])

            aux = {
              'id': id,
              'pitch': hotspot['pitch'],
              'yaw': hotspot['yaw'],
              'text': hotspot['text'],
              'type': hotspot['type'],
              'targetYaw': hotspot['targetYaw'] || -23,
              'targetPitch': hotspot['targetPitch'] || 2,
              'cssClass': hotspot['cssClass']
            }

            if(hotspot['sceneId']) {
              aux.sceneId = hotspot['sceneId'] || null
            }

            if(hotspot['url']) {
              aux.url = hotspot['url'] || null
            }

            if (hotspot['createTooltipArgs'] ){
              aux.createTooltipFunc = this.hotspot.bind(this),
              aux.createTooltipArgs = {
                  'title': hotspot['title'],
                  'id': hotspot['id'],
                  'customIcon': hotspot['createTooltipArgs']['customIcon']
              }
            }

          if(hotspot['show_modal'] == 'local'){
            aux.createTooltipArgs.modal = hotspot['createTooltipArgs']['modal'],
            aux.createTooltipArgs.modal.type = "local"
          } else if (hotspot['show_modal']=='db') {
            aux.createTooltipArgs.modal = hotspot['createTooltipArgs']['modal'],
            aux.createTooltipArgs.modal.type = "db"
          }

            // Agregar el hotspot al array
            hotspotsArray.push(aux)
          }
        )

        // Construccion de la Scena
        let sceneAux = {
          "id": scene['id'],
          "title": scene['title'],
          "hfov": scene['hfov'] || 110,
          "yaw": scene['yaw'] || 150,
          "panorama": scene['panorama'],
          "type": "equirectangular",
          "hotSpots": hotspotsArray,
        }

        this.sceneJson[scene['id']] = sceneAux

      }
    )

    let validate = this.validateSchema(this.parseSchenesJson());
    if(validate){
      return {error: validate};
    }
    return this.sceneJson
  }
  // * initPannellum
  //  *
  //  * iniciar pannellum
  //  * @param panoramaHTML id del elemento panorama en el DOM
  //  * @param viewId primera escena a mostrar
  //  * @param sceneJson json formateado de manera que sea legible para pannellum para poder construir el tour
  //  * @param edit determina si el tour sera editable o no
  //  */
  public initPannellum(panoramaHTML, viewId, sceneJson, edit = null) {

    console.info("Iniciando pannellum");

    // Guardar la escena activa
    this.activeScene = viewId
    console.log("aqui estoy")

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
    console.log("aqui estoy")


    // Activar los eventos para agregar hotSpots
    if (edit) {

      // Evento para click del mouse agregar un nuevo addHotspothotspot
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
    hotspotType
    // Activar el evento
    this.toogleAddHotspot(true)

    // Guardar el tipo de hotspot
    this.hotspotType = hotspotType;

    // hotspot
    this.nextAddHotspot = hotspot;

    // Si se va a usar la funcion custom
    this.customFunction = customFun
    console.log('eableAddHotspot function');
    console.log(this.sceneJson);
    console.log(this.scenes);
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
    let p = this.pannellumViewer.getScene();
    this.pannellumViewer.addHotSpot(this.nextAddHotspot, p)

    console.log('add hotpost function pannellum')
    console.log(this.sceneJson);
    console.log(this.scenes);
  }

  /**
   * removeHotspot
   * Eliminar hotspot
   * @param id Id del hotspot a eliminar
   */
  public removeHotspot(id: string) {
    let p = this.pannellumViewer.getScene();
    this.pannellumViewer.removeHotSpot(id, p)
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
   * Devuelve los hotSpots de la escena activa
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

    // Custom ID
    hotSpotDiv.id = args.id;


    // Se crea el evento para abrir el modal
    if (args.modal) {

      if ( args.modal.type === "db"){
        this.apiServive.getArtefact(args.modal.id).subscribe(
          data =>{

            let modalData = {
              'title': data.result[0].labelArtifact.value || null,
              'description': data.result[0].note.value || null,
              'imagen': {
                'src': args.modal.imagen.src,
                'alt': args.modal.imagen.alt,
                'width': args.modal.imagen.width,
                'height': args.modal.imagen.height,
              }
            }

            let modal = document.getElementById(args.id)
            modal.onclick = () => this.openModal(modalData)

          }
        );
      }
      else{
        let modal = document.getElementById(args.id)
        modal.onclick = () => this.openModal(args.modal)
      }

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
      // Quitamos la clase de pannellum para quitar el icono por defecto
      hotSpotDiv.classList.remove('pnlm-hotspot')

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
    if (this.pannellumViewer) this.pannellumViewer.loadScene(sceneId);
  }

  /**
   * Nota: Para usar este service es necesario que el panellum este iniciado. El usuarlo sin que el panellum se encuentre instanciado puede
   * traer como consecuencia la aparicion de errores referentes a que las escenas no tienen ningun hotpots.
   * 
   * getAllHotspots
   * Obtiene todos los hotSpots del recorrido
   * @return arreglo con todos los hotSpots del recorrido
   */
  public getAllHotspots() {

    let hotSpots = [];
    if ( this.sceneJson ){

      for (let i in this.scenes) {
        for (let j of this.sceneJson[this.scenes[i]]['hotSpots']){
          hotSpots.push(j)
        }
      }
      return hotSpots;
    }
    return []
  }

  /**
   * Nota: Para usar este service es necesario que el panellum este iniciado. El usuarlo sin que el panellum se encuentre instanciado puede
   * traer como consecuencia la aparicion de errores referentes a que las escenas no tienen ningun hotpots.
   * 
   * getCurrentSceneHotspots
   * Obtiene la lista de hotSpots de la escena actual
   * @return arreglo con todos los hotSpots de la escena
   */
  public getCurrentSceneHotspots() {
    if (this.pannellumViewer ){
      let p = this.pannellumViewer.getScene();
      return this.sceneJson[p]['hotSpots']
    }
    return []
  }

  /**
  * Nota: Para usar este service es necesario que el panellum este iniciado. El usuarlo sin que el panellum se encuentre instanciado puede
  * traer como consecuencia la aparicion de errores referentes a que las escenas no tienen ningun hotpots.
  * 
  * getImageSource
  * Obtiene la ruta de la imagen de una escena
  * @param scene_id id de la escena
  */
  public getImageSource(scene_id: string) {
    if ( this.sceneJson ){
      if( this.sceneJson[scene_id] ){
        return this.sanitizer.bypassSecurityTrustUrl(this.sceneJson[scene_id]['panorama']);
      }
    }
    return []
  }

  /**
  * Nota: Para usar este service es necesario que el panellum este iniciado. El usuarlo sin que el panellum se encuentre instanciado puede
  * traer como consecuencia la aparicion de errores referentes a que las escenas no tienen ningun hotpots.
  * 
  * getSceneTitle
  * Obtiene el título de una escena
  * @param scene_id id de la escena
  */
  public getSceneTitle(scene_id: string) {
    if ( this.sceneJson ){
      if( this.sceneJson[scene_id] ){
        return this.sceneJson[scene_id]['title']
      }
    }
    return []
  }

  /**
   * addSCene
   * añadir escena
   * @param scene_id Id de la escena a agregar
   * @param confi arreglo con las configuraciones(titulo, url) de la nueva escena
   */
  public addSCene(scene_id: string, confi: [string,string]){
    let escenaAux = {
      "title": confi[0],
      "hfov": 110,
      "yaw": 150,
      "panorama": confi[1],
      "type": "equirectangular",
      "hotSpots": [],
    }
    this.pannellumViewer.addScene(scene_id,escenaAux);
    this.scenes.push(scene_id);
  }

  /**
   * removeSCene
   * Eliminar escena
   * @param id Id de la escena a eliminar
   */
   public removeSCene(id: string) {
    var index = this.scenes.indexOf(id);
    this.pannellumViewer.removeScene(id);
    this.scenes.splice(index, 1);
    console.log(this.sceneJson);

  }

  public validateSchema(data) {
    var validate = ajv.compile(this.schema);
    var valid = validate(data);
    console.log(validate.errors);
  
    if (valid) {
      return false;
    } else {
      return validate.errors[0].message;
    }
  }

  public parseSchenesJson() {
    let scenes = [];
    for (const k in this.sceneJson) { scenes.push(this.sceneJson[k]) };

    let json = {
      "scenes": scenes
    }

    return json;
  }
}