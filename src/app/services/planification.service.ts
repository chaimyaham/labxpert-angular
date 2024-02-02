import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reactif} from "../models/reactif";
import {Planification} from "../models/planification";

@Injectable({
  providedIn: 'root'
})
export class PlanificationService {

  url = "http://localhost:8088/api/v1/";

  constructor(private http:HttpClient) { }
  getAllPlanifications(): Observable<Planification[]>{
    return this.http.get<Planification[]>(`${this.url}scheduling`);
  }
  addPlanification(planification : any): Observable<Planification>{
    return this.http.post<Planification>(`${this.url}scheduling`,planification);
  }
}
