import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Echantillon } from 'src/app/models/echantillon.interface';
import { environment } from 'src/environments/environment';

import {EchantillonRequest} from "../models/echantillonRequest";
import EchantillonResponse from "../models/echantillonResponse";

@Injectable({
  providedIn: 'root'
})
export class EchantillonService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getAllEchantillons(): Observable<EchantillonResponse[]> {
    return this.http.get<EchantillonResponse[]>(`${this.apiUrl}echantillons`).pipe(
      catchError(this.handleErrors)
    );
  }

  getEchantillonById(id: number): Observable<Echantillon> {
    return this.http.get<Echantillon>(`${this.apiUrl}echantillons/${id}`);
  }

  createEchantillon(echantillonRequest: EchantillonRequest): Observable<EchantillonRequest> {
    return this.http.post<EchantillonRequest>(`${this.apiUrl}echantillons`, echantillonRequest);
  }

  updateEchantillon(id: number, echantillon: Echantillon): Observable<Echantillon> {
    return this.http.put<Echantillon>(`${this.apiUrl}echantillons/${id}`, echantillon);
  }


  deleteEchantillon(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}echantillons/${id}`);
  }
  private handleErrors(error: any): Observable<never> {
    console.error('Une erreur s\'est produite :', error);
    return throwError(()=> new Error('Erreur lors de la récupération des données.'));
  }
}
