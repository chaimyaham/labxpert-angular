import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {Patient} from "../models/patient";

import {Utilisateur} from "../models/utilisateur";


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  url = "http://localhost:8088/api/v1/user";


  constructor(private http:HttpClient) { }
  getAll():Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(this.url);

  }
  public saveUtilisateur(utilisateur:Utilisateur):Observable<Utilisateur>{
    return this.http.post<Utilisateur>(this.url,utilisateur);
  }
  public deleteUtilisatur(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }
  public getUtilisateurById(id:number):Observable<Utilisateur>{
    return this.http.get<Utilisateur>(`${this.url}/${id}`);
  }
  public  update(id: number, data: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.url}/${id}`, data);
  }
}
