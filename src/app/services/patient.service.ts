import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Patient} from "../models/patient";

import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  url = "http://localhost:8088/api/v1/patient";

  constructor( private http:HttpClient) { }
  getAll():Observable<Patient[]>{
    return this.http.get<Patient[]>(this.url);

  }
  public savePatient(p:Patient):Observable<Patient>{
    return this.http.post<Patient>(this.url,p);
  }
  public deletePatient(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }
  public getPatientById(id:number):Observable<Patient>{
    return this.http.get<Patient>(`${this.url}/${id}`);
  }
  public  update(id: number, data: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.url}/${id}`, data);
  }

}
