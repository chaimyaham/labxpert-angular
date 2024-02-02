import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AnalyseRequest} from "../models/analyseRequest";


@Injectable({
  providedIn: 'root'
})
export class AnalyseService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getAllAnalyse(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}analyse`).pipe(
      catchError(this.handleErrors)
    );
  }

  getAnalyseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}analyse/${id}`);
  }

  createAnalyse(analyseRequest: AnalyseRequest): Observable<AnalyseRequest> {
    return this.http.post<AnalyseRequest>(`${this.apiUrl}analyse/all`, analyseRequest);
  }

  updateAnalyse(id: number, analyseRequest: AnalyseRequest): Observable<AnalyseRequest> {
    return this.http.put<AnalyseRequest>(`${this.apiUrl}analyse/${id}`, analyseRequest);
  }


  deleteEchantillon(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}echantillons/${id}`);
  }
  private handleErrors(error: any): Observable<never> {
    console.error('Une erreur s\'est produite :', error);
    return throwError(()=> new Error('Erreur lors de la récupération des données.'));
  }
}
