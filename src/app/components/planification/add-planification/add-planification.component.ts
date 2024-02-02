import { Component, OnInit } from '@angular/core';
import {Echantillon} from "../../../models/echantillon.interface";
import {Utilisateur} from "../../../models/utilisateur";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EchantillonService} from "../../../services/echantillon.service";
import {UtilisateurService} from "../../../services/utilisateur.service";
import {PlanificationService} from "../../../services/planification.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import EchantillonResponse from "../../../models/echantillonResponse";
import {AnalyseService} from "../../../services/analyse.service";
import {AnalyseRequest} from "../../../models/analyseRequest";
import Analyse from "../../../models/analyse";

@Component({
  selector: 'app-add-planification',
  templateUrl: './add-planification.component.html',
  styleUrls: ['./add-planification.component.css']
})
export class AddPlanificationComponent implements OnInit {
  echantillons : EchantillonResponse[]=[]
  utilisateurs : Utilisateur[]=[]
  //analyse : Analyse[]=[]
  planificationForm!: FormGroup
  errorMessage: string = '';
  analyses:Analyse[]=[];
  constructor(

    private formBuilder: FormBuilder,
    private echantillonService : EchantillonService ,
    private utilisateurService:UtilisateurService,
    private planificationService : PlanificationService,
    private router : Router,
    private datePipe: DatePipe,
    private analyseService:AnalyseService
  ) { }

  ngOnInit(): void {
    this.utilisateurService.getAll().subscribe(
      data => {
        this.utilisateurs = data;
      },
      error => {
        console.log(error);
      }
    )
    this.echantillonService.getAllEchantillons().subscribe(
      data => {
        this.echantillons = data;
      },
      error => {
        console.log(error);
      }
    )
    this.analyseService.getAllAnalyse().subscribe(
      data => {
        this.analyses = data;
      },
      error => {
        console.log(error);
      }
    )
    this.initForm();
  }
  initForm(): void {
    this.planificationForm = this.formBuilder.group({
      dateDebut: ['', Validators.required],
      commentaire: ['', Validators.required],
      utilisateurId: [null, Validators.required],
      echantillonId: [null, Validators.required],
      analyseId: [null, Validators.required],

    });
  }
  onSubmit(){
    const formData = this.planificationForm.value;
    const dateTimeExpirationValue = this.datePipe.transform(formData.dateDebut, 'yyyy-MM-ddTHH:mm:ss');
    const utilisateurIdValue = parseInt(formData.utilisateurId);
    const echantillonIdValue = parseInt(formData.echantillonId);
    const analyseIdValue = parseInt(formData.analyseId);
    console.log(dateTimeExpirationValue, utilisateurIdValue,echantillonIdValue,analyseIdValue);

    const modifiedFormData = {
      dateDebut: dateTimeExpirationValue,
      commentaire: formData.commentaire,
      utilisateurId: utilisateurIdValue,
      echantillonId:echantillonIdValue,
      analyseId:analyseIdValue
    };
    console.log(modifiedFormData)
    this.planificationService.addPlanification(modifiedFormData).subscribe(
      (response) => {
        console.log("Données du planification envoyées avec succès", response);
        this.router.navigate(['planification/all']);
      },
      (error) => {
        console.log(error.message);
        if (error.status === 400) {
          const errorMessage = error.error.message;
          console.log("Message d'erreur :", errorMessage);
          this.errorMessage = errorMessage;}
      }
    );

  }
}
