import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  MuseumOverview } from '../models/museum.model';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Artifact } from '../models/artifact.model';

export interface MuseumsResponse {
  ok: boolean,
  result: MuseumOverview[],
}

export interface userLogin {
  ok: boolean;
  message: string
  user: any
  token: string
}

export interface userRegister {
  ok: boolean;
  registered: string
  message: string
  user: any
  token: string
}

export interface MuseumArtifactsResponse {
  ok: boolean,
  result: Artifact[],
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }



  //---------------------------------------------------------------------------------
  userRole = 'visitante';
  //userRole = 'admin';
  //---------------------------------------------------------------------------------

  /** Servicio para realizar cambio de la vista que se muestra segun el tipo de usuario.
   * @returns
   */
   changeRole() {
     let vista = this.userRole
     if(vista === "visitante"){
       this.userRole = "admin"
     }
     else{
       this.userRole = "visitante"
     }
      
  }

  /** Servicio para realizar login de un usuario.
   * @param {string} email0 correo del usuario a realizar login
   * @param {string} password0 contrasena del usuario
   * @returns
   */
   login(email0: string, password0: string): Observable<userLogin> {
    const url = environment.apiUrl + `/users/login`;
    const payload = { email: email0, password: password0 };
    return this.http
      .post<userLogin>(url, { email: email0, password: password0 })
      .pipe(tap(console.log));
  }

  /** Servicio para realizar registro de un admin.
   * @param {string} email0 correo del Usuario a realizar login
   * @param {string} first_name0 nombre del usuario
   * @param {string} last_name0 apellido del usuario
   * @param {string} password0 contrasena del usuario
   * @param {string} type0 tipo de usuario
   * @returns
   */
   signUp(email0: string, first_name0: string, last_name0: string, password0: string, type0: string): Observable<userRegister> {
    const url = environment.apiUrl + `/users/new_user`;
    const payload = { email: email0, first_name: first_name0, last_name: last_name0, password: password0, type: type0 };
    return this.http
      .post<userRegister>(url, { email: email0, first_name: first_name0, last_name: last_name0, password: password0, type: type0 })
      .pipe(tap(console.log));
  }

  /**
   * Fetches a museum and it's details.
   * @param label - Museum identifier.
   * @returns {Observable<MuseumArtifactsResponse>} The museum requested Overview.
   */
  getMuseumArtifacts = (label: string): Observable<MuseumArtifactsResponse> => {
    const url = environment.apiUrl + `/museum/?label="${label}"`;
    return this.http.get<MuseumArtifactsResponse>(url).pipe(tap(console.log));
  };

  /**
   * Fetches all museums overview.
   * @returns {Observable<MuseumsResponse>} A list with all the museums.
   */
  getMuseums = (): Observable<MuseumsResponse> => {
    const url = environment.apiUrl + '/museums';
    return this.http.get<MuseumsResponse>(url).pipe(tap(console.log));
  };

  getMuseumDetails = (label: string): Observable<MuseumOverview> => {
    const url = environment.apiUrl + '/museums';
    return this.http.get<MuseumsResponse>(url).pipe(
      tap(console.log),
      map((response: MuseumsResponse) =>
        response.result.find((museum: MuseumOverview) => museum.label === label)
      )
    );
  }

  /**
   * Fetches an Artefact and it's details.
   * @param id - Artefact identifier.
   * @returns {Observable<MuseumArtifactsResponse>} The artefact requested details.
   */
  getArtefact = (id: string): Observable<MuseumArtifactsResponse> => {
    const url = environment.apiUrl + `/artifact/${id}`;
    return this.http.get<MuseumArtifactsResponse>(url).pipe(tap(console.log));
  };


  /**
    * Fetches an artifact image url.
    * @param id - Artifact identifier.
    * @returns The url of the artifact image.
    */
  getArtifactImage(id: string){
    const url = environment.apiUrl + `/image/${id}`;
    return url;
  };


  /**
   * Executes an http get request.
   * @param url - The url to get from.
   * @param headers - Optional headers for the http request.
   * @returns {Observable<T>} An observable of the generic defined type.
   */
  get = <T extends unknown>(url: string, headers?: HttpHeaders): Observable<T> => {
    const options = headers ? { headers } : undefined;
    return this.http.get<T>(url, options);
  };
}
