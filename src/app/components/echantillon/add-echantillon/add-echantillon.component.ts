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


@Component({
  selector: 'app-add-echantillon',
  templateUrl: './add-echantillon.component.html',
  styleUrls: ['./add-echantillon.component.css']
})

export class AddEchantillonComponent implements OnInit {
  echantillonForm!: FormGroup;
  reactifs: Reactif[] = [];
  reactifAnalyse: ReactifAnalyse[]=[]
  nameError: string | null = null;
  errorMessage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private echantillonService: EchantillonService,
    private reactifService : ReactifService,
    private router: Router,
    private datePipe : DatePipe
  ) {
  }


  ngOnInit(): void {

    this.reactifService.getAllReactifs().subscribe(
      data =>{
        this.reactifs = data;
      },
      error =>{
        console.log(error);
      }
    )
    this.initForm();
  }

  initForm(): void {
    this.echantillonForm = this.formBuilder.group({
      nom: ['', Validators.required],
      patientId:[null,Validators.required],
      utilisateurId:[null,Validators.required],
      reactifId:[null,Validators.required],
      dateDeReception : ['',Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {

    if (this.echantillonForm.valid) {
      const formData = this.echantillonForm.value;
      this.echantillonService.createEchantillon(formData).subscribe(
        (response) => {
          console.log("Donnees des echantillons envoyer avec success", response);
          this.router.navigate(['supplier/all']);
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
  }
  getReactifNom(reactifId: number): string {
    const reactif = this.reactifs.find(r => r.idReactif === reactifId);
    return reactif ? reactif.nom : '';
  }
  creatReactifsList(){

      const reactifId = this.echantillonForm.get('reactifId')?.value;
      if (!reactifId){
        return;
      }
      const quantite = this.echantillonForm.get('quantite')?.value;
      // Réinitialisez seulement les champs 'reactifId' et 'quantite'
      this.echantillonForm.get('reactifId')?.reset();
      this.echantillonForm.get('quantite')?.reset();

      console.log("reactif id", reactifId)
      console.log("quantite", quantite)
      const newReactif: ReactifAnalyse = {
        id :0,
        reactifIdReactif: reactifId,
        quantite: quantite,
      };

      this.reactifAnalyse.push(newReactif);

  }

}
