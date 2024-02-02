import {Component, OnInit} from '@angular/core';


import {Echantillon} from "../../models/echantillon.interface";
import {Utilisateur} from "../../models/utilisateur";
import {EchantillonService} from "../../services/echantillon.service";
import {PlanificationService} from "../../services/planification.service";
import {UtilisateurService} from "../../services/utilisateur.service";
import {Planification} from "../../models/planification";
import {AnalyseRequest} from "../../models/analyseRequest";
import {AnalyseService} from "../../services/analyse.service";
import PlanificationResponse from "../../models/PlanificationResponse";


@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.css']
})
export class PlanificationComponent implements OnInit {

  planifications: PlanificationResponse[] = []
  currentPage = 0;
  pageSize = 3;
  palanificationfPages!: Planification[][];

  constructor(
    private planificationService: PlanificationService
  ) {
  }

  ngOnInit(): void {

    this.getPlanification()
  }

  getPlanification() {
    this.planificationService.getAllPlanifications().subscribe(
      (response) => {
          this.planifications = response;
      },
      (error) => {
        console.log(error.message);
        if (error.status === 400) {
          console.log("Message d'erreur :");

        }
      }
    );

  }




}
