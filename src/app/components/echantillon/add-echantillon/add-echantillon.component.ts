import {Component, NgModule, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {FournisseurService} from "../../../services/fournisseur.service";
import {Router} from "@angular/router";
import {EchantillonService} from "../../../services/echantillon.service";
import {Reactif} from "../../../models/reactif";
import {ReactifService} from "../../../services/reactif.service";
import {DatePipe} from "@angular/common";
import {ReactifAnalyse} from "../../../models/reactifAnalyses.interface";

import {Echantillon} from "../../../models/echantillon.interface";
import {EchantillonRequest} from "../../../models/echantillonRequest";
import {Patient} from "../../../models/patient";
import {Utilisateur} from "../../../models/utilisateur";
import {PatientService} from "../../../services/patient.service";
import {UtilisateurService} from "../../../services/utilisateur.service";


@Component({
  selector: 'app-add-echantillon',
  templateUrl: './add-echantillon.component.html',
  styleUrls: ['./add-echantillon.component.css']
})

export class AddEchantillonComponent implements OnInit {
  echantillonForm!: FormGroup;
  reactifs: Reactif[] = [];
  patients: Patient[]= [] ;
  utlisateurs: Utilisateur[]= [];
  reactifAnalyse: ReactifAnalyse[] = []
  nameError: string | null = null;
  errorMessage: string = '';
  selectedReactifId: number | null | undefined;
  selectedReactifName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private echantillonService: EchantillonService,
    private reactifService: ReactifService,
    private router: Router,
    private datePipe: DatePipe,
    private patientService:PatientService,
    private utilisateurService: UtilisateurService
  ) {
  }


  ngOnInit(): void {

    this.reactifService.getAllReactifs().subscribe(
      data => {
        this.reactifs = data;
      },
      error => {

        console.log(error);
      }
    )
    this.utilisateurService.getAll().subscribe(
      data => {
        this.utlisateurs = data;
      },
      error => {

        console.log(error);
      }
    )
    this.patientService.getAll().subscribe(
      data => {
        this.patients = data;
      },
      error => {

        console.log(error);
      }
    )

    this.initForm();
  }

  initForm(): void {
    this.echantillonForm = this.formBuilder.group({
      nom: ['', Validators.required],
      patientId: [null, Validators.required],
      utilisateurId: [null, Validators.required],
      reactifId: [null, Validators.required],
      dateDeReception: ['', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {

    const formData = this.echantillonForm.value;
    const dateDeReception = this.datePipe.transform(formData.dateDeReception, 'yyyy-MM-ddTHH:mm:ss');
    console.log("errorMessage--- dateDeReception------", dateDeReception);

    if(dateDeReception == null){
      this.errorMessage = " Veuillez en choisir un Date Reciption.";
      console.log("errorMessage--- dateDeReception------");
      return;
    }
    if (this.reactifAnalyse.length <= 0) {
      this.errorMessage = " Veuillez en choisir un reactif."
      console.log("errorMessage--- reactifAnalyse------");
      return;
    }


    console.log("dateDeReception");
    let echantillonRequest: EchantillonRequest;
    echantillonRequest = {
      utilisateurId: formData.utilisateurId,
      patientId: formData.patientId,
      dateDeReception: dateDeReception,
      reactifAnalyses: this.reactifAnalyse,

    };
    console.log(echantillonRequest);
    this.echantillonService.createEchantillon(echantillonRequest).subscribe(
      (response) => {
        console.log("Donnees des echantillons envoyer avec success", response);
        this.router.navigate(['echantillon/all']);
      },
      (error) => {
        console.error('Erreur lors de envoi des données au backend', error);
        if (error.status === 400) {
          this.nameError = 'Le nom du echantillon existe déjà. Veuillez en choisir un autre.';
        } else {
          this.nameError = 'Une erreur s\'est produite lors de l\'ajout du echantillons.';
        }

      }
    )


  }

  getReactifNom(reactifId: number): string {
    // Utilisez parseInt pour vous assurer que reactifId est de type number
    let reactif = this.reactifs.find(reactif => reactif.idReactif === parseInt(reactifId.toString()));

    // Vérifiez si reactif est défini
    if (reactif) {
      return reactif.nom;
    } else {
      this.errorMessage = "Réactif non trouvé !"
      return '';
    }

  }
    creatReactifsList()
    {
      const reactifId = this.echantillonForm.get('reactifId')?.value;
      console.log(`reactif Id ${reactifId}`);
      if (!reactifId) {
        return;
      }
      if (this.reactifAnalyse.find(reactif => reactif.reactifIdReactif === reactifId)) {
        this.errorMessage = "Ce réactif a déjà été sélectionné. Veuillez en choisir un autre."
        return;
      }
      const quantite = this.echantillonForm.get('quantite')?.value;
      // Réinitialisez seulement les champs 'reactifId' et 'quantite'
      this.echantillonForm.get('reactifId')?.reset();
      this.echantillonForm.get('quantite')?.reset();


      const newReactif: ReactifAnalyse = {
        id: 0,
        reactifIdReactif: reactifId,
        quantite: quantite,
      };
      this.reactifAnalyse.push(newReactif);

    }



}
