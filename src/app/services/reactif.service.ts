import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reactif } from '../models/reactif';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReactifService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllReactifs(): Observable<Reactif[]>{
    return this.http.get<Reactif[]>(`${this.apiUrl}reactif`);
  }
  addReactif(reactif : any): Observable<Reactif>{
    return this.http.post<Reactif>(`${this.apiUrl}reactif`,reactif);
  }
  deleteReactif(idReactif:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}reactif/${idReactif}`);
  }
  getReactifById(idReactif:number):Observable<Reactif>{
    return this.http.get<Reactif>(`${this.apiUrl}reactif/${idReactif}`);
  }
  updateReactif(reactif:any, idReactif:number):Observable<Reactif>{
    return this.http.put<Reactif>(`${this.apiUrl}reactif/${idReactif}`,reactif);
  }
}
