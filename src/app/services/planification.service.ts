import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reactif} from "../models/reactif";
import {Planification} from "../models/planification";
import PlanificationResponse from "../models/PlanificationResponse";

@Injectable({
  providedIn: 'root'
})
export class PlanificationService {


  url = "http://localhost:8088/api/v1/";


  constructor(private http:HttpClient) { }
  getAllPlanifications(): Observable<PlanificationResponse[]>{
    return this.http.get<PlanificationResponse[]>(`${this.url}scheduling`);
  }
  addPlanification(planification : any): Observable<Planification>{
    return this.http.post<Planification>(`${this.url}scheduling`,planification);
  }
}
