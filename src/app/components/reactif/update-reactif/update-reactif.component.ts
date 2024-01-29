import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fournisseur } from 'src/app/models/fournisseur';
import { Reactif } from 'src/app/models/reactif';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ReactifService } from 'src/app/services/reactif.service';

@Component({
  selector: 'app-update-reactif',
  templateUrl: './update-reactif.component.html',
  styleUrls: ['./update-reactif.component.css']
})
export class UpdateReactifComponent implements OnInit {
  fournisseurs : Fournisseur[]=[]
  reactifForm!: FormGroup 
  errorMessage: string = '';
  existingReactif!: Reactif ;
  reactifId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private fournisseurService : FournisseurService , 
    private reactifService : ReactifService,
    private router : Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute
    
  
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.fournisseurService.getAllFournisseurs().subscribe(
      data => {
        this.fournisseurs = data;
      },
      error => {
        console.log(error);
      }
    )
    this.route.params.subscribe(params => {
      this.reactifId = params['id'];
      this.reactifService.getReactifById(parseInt(this.reactifId)).subscribe(
        (reactif: Reactif) => {
          this.existingReactif = reactif;
          this.updateForm(); 
        },
        error => {
          console.error("Erreur lors de la récupération du Reactif :", error);
        }
      );
    });
   
  }
  initForm(): void {
    this.reactifForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      fournisseurIdFournisseur: [null, Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
      dateExpiration: ['', Validators.required]
    });
  }
  updateForm(): void {
    if (this.existingReactif) {
      this.reactifForm.patchValue({
        nom: this.existingReactif.nom,
        description: this.existingReactif.description,
        quantite: this.existingReactif.quantite
      });
    }
  }
  onSubmit(){
    if(this.reactifForm.valid){
      const formData = this.reactifForm.value;
      const dateTimeExpirationValue = this.datePipe.transform(formData.dateExpiration, 'yyyy-MM-ddTHH:mm:ss');
      const fournisseurIdFournisseurValue = parseInt(formData.fournisseurIdFournisseur);
      const modifiedFormData = {
        nom: formData.nom,
        description: formData.description,
        fournisseurIdFournisseur: fournisseurIdFournisseurValue,
        quantite: formData.quantite,
        dateExpiration: dateTimeExpirationValue
      };
      console.log(formData)
      this.reactifService.updateReactif(modifiedFormData,parseInt(this.reactifId)).subscribe(
        (response)=>{
          console.log("Reactif modifier  avec success",response);
          this.router.navigate(['reactif/all']); 
        },
        (error)=>{
          console.error('Erreur lors de envoi des données au backend', error);
          if (error.status === 400) {
            this.errorMessage = 'Le nom du reactif existe déjà. Veuillez en choisir un autre.';
          } else {
            this.errorMessage = 'Une erreur s\'est produite lors de l\'ajout du reactif.';
          }
          
        }
      )

    }

  }

}
