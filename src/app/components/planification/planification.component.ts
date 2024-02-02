import { Component, OnInit } from '@angular/core';
import {Echantillon} from "../../models/echantillon.interface";
import {Utilisateur} from "../../models/utilisateur";
import {EchantillonService} from "../../services/echantillon.service";
import {PlanificationService} from "../../services/planification.service";
import {UtilisateurService} from "../../services/utilisateur.service";
import {Planification} from "../../models/planification";
import {AnalyseRequest} from "../../models/analyseRequest";
import {AnalyseService} from "../../services/analyse.service";
;

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.css']
})
export class PlanificationComponent implements OnInit {

  planifications :Planification[]=[]
  utilisateurs:Utilisateur[]=[]
  echantillons:Echantillon[]=[]
  analyses:AnalyseRequest[]=[]
  currentPage = 0;
  pageSize = 3;
  palanificationfPages!: Planification[][];

  constructor(
    private echantillonService : EchantillonService,
    private utilisateurService:UtilisateurService,
    private planificationService : PlanificationService,
    private analyseService:AnalyseService



  ) { }

  ngOnInit(): void {

this.getPlanification()
  }
  getPlanification(){
    this.planificationService.getAllPlanifications().subscribe(
      (response)=>{
        this.planifications=response;
        this.palanificationfPages = this.paginatePlanification(this.planifications, this.pageSize);
        for(let palanification of this.planifications){
          this.utilisateurService.getUtilisateurById(palanification.utilisateurId).subscribe(
            (response)=>{
              this.utilisateurs.push(response);
            },(error)=>{
              console.log(error)
            }
          );
          this.echantillonService.getEchantillonById(palanification.echantillonId).subscribe(
            (response)=>{
              this.echantillons.push(response);
            },(error)=>{
              console.log(error)
            }
          );

        }
      },
      (error)=>{
        console.error('error lors de la recuperationde la liste des planifications',error);
      }
    )

  }
  paginatePlanification(palnifications: Planification[], pageSize: number): Planification[][] {
    const pages = [];
    for (let i = 0; i < palnifications.length; i += pageSize) {
      pages.push(palnifications.slice(i, i + pageSize));
    }
    return pages;
  }
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.palanificationfPages.length - 1) {
      this.currentPage++;
    }
  }


}
