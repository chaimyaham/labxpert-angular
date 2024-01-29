import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Echantillon } from 'src/app/models/echantillon.interface';
@Injectable({
  providedIn: 'root'
})
export class EchantillonService {
  private apiUrl = 'http://localhost:8088/api/v1/echantillons';
  constructor(private http: HttpClient) { }
  getAllEchantillons(): Observable<Echantillon[]> {
    return this.http.get<Echantillon[]>(`${this.apiUrl}`).pipe(
      catchError(this.handleErrors)
    );;
  }

  getEchantillonById(id: number): Observable<Echantillon> {
    let echantillon : Observable<Echantillon> = this.http.get<Echantillon>(`${this.apiUrl}/${id}`);
    return echantillon;
  }

  createEchantillon(echantillon: any): Observable<Echantillon> {
    return this.http.post<Echantillon>(`${this.apiUrl}`, echantillon);
  }

  updateEchantillon(id: number, echantillon: any): Observable<Echantillon> {
    return this.http.put<Echantillon>(`${this.apiUrl}/${id}`, echantillon);
  }

  deleteEchantillon(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  private handleErrors(error: any): Observable<never> {
    console.error('Une erreur s\'est produite :', error);
    return throwError(()=> new Error('Erreur lors de la récupération des données.'));
  }
}
