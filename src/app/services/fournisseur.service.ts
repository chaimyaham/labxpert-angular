import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Fournisseur } from '../models/fournisseur';
@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getAllFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.apiUrl}fournisseur`)
  }
  addFournisseur(fournisseurData: Fournisseur):  Observable<Fournisseur>{
    return this.http.post<Fournisseur>(`${this.apiUrl}fournisseur`,fournisseurData)

  }
  deleteFournisseur(idFournisseur : number) :Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}fournisseur/${idFournisseur}`)
  }
  getFournisseurById(idFournisseur : number):   Observable<Fournisseur>{
   return this.http.get<Fournisseur>(`${this.apiUrl}fournisseur/${idFournisseur}`)
  }
  updateFournisseur(fournisseur: Fournisseur,idFournisseur : number) : Observable<Fournisseur>{
    return this.http.put<Fournisseur>(`${this.apiUrl}fournisseur/${idFournisseur}`,fournisseur)
  }
}
