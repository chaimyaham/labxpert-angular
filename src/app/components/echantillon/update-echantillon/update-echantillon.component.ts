import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { Reactif } from 'src/app/models/reactif';
import { ReactifAnalyse } from 'src/app/models/reactifAnalyses.interface';
import { Utilisateur } from 'src/app/models/utilisateur';
import { EchantillonService } from 'src/app/services/echantillon.service';
import { PatientService } from 'src/app/services/patient.service';
import { ReactifService } from 'src/app/services/reactif.service';
import {UtilisateurService} from "../../../services/utilisateur.service";
import { EchantillonRequest } from 'src/app/models/echantillonRequest';
import EchantillonResponse from 'src/app/models/echantillonResponse';
import { Echantillon } from 'src/app/models/echantillon.interface';


@Component({
  selector: 'app-update-echantillon',
  templateUrl: './update-echantillon.component.html',
  styleUrls: ['./update-echantillon.component.css']
})
export class UpdateEchantillonComponent implements OnInit {
  echantillonForm!: FormGroup;
  reactifs: Reactif[] = [];
  patients: Patient[]= [] ;
  utlisateurs: Utilisateur[]= [];
  reactifAnalyse: ReactifAnalyse[] = []
  nameError: string | null = null;
  errorMessage: string = '';
  selectedReactifId: number | null | undefined;
  selectedReactifName: string = '';
  echantillonId!: string;
  existingEchantillion!:Echantillon;


  constructor(
    private formBuilder: FormBuilder,
    private echantillonService: EchantillonService,
    private reactifService: ReactifService,
    private router: Router,
    private datePipe: DatePipe,
    private patientService:PatientService,
    private utilisateurService: UtilisateurService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.echantillonId = params['id'];
      this.echantillonService.getEchantillonById(parseInt(this.echantillonId)).subscribe(
        (echantillon: Echantillon) => {
          this.existingEchantillion = echantillon;
           this.updateForm();
        },
        error => {
          console.error("Erreur lors de la récupération du fournisseur :", error);
        }
      );
    });
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
      patientId: [null, Validators.required],
      utilisateurId: [null, Validators.required],
      reactifId: [null, Validators.required],
      dateDeReception: ['', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
    });
  }
  updateForm(): void {
    if (this.existingEchantillion ) {
      this.echantillonForm.patchValue({
        patientId: this.existingEchantillion.patientId,
        utilisateurId: this.existingEchantillion.utilisateurId,
        dateDeReception: this.existingEchantillion.dateDeReception,
      });
      this.reactifAnalyse=this.existingEchantillion.reactifAnalyses
    }
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
    onSubmit(): void {

    }

}
