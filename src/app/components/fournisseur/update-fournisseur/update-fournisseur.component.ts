import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-update-fournisseur',
  templateUrl: './update-fournisseur.component.html',
  styleUrls: ['./update-fournisseur.component.css']
})
export class UpdateFournisseurComponent implements OnInit {
  fournisseurForm!: FormGroup;
  nameError: string | null = null;
  existingFournisseur!: Fournisseur ;
  fournisseurId!: string;

  constructor(private formBuilder: FormBuilder,private fournisseurService : FournisseurService,private router: Router , private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe(params => {
      this.fournisseurId = params['id'];
      this.fournisseurService.getFournisseurById(parseInt(this.fournisseurId)).subscribe(
        (fournisseur: Fournisseur) => {
          this.existingFournisseur = fournisseur;
          this.updateForm();
        },
        error => {
          console.error("Erreur lors de la récupération du fournisseur :", error);
        }
      );
    });
  }

  initForm(): void {
    this.fournisseurForm = this.formBuilder.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      tel: ['', Validators.required]
    });

  }
  updateForm(): void {
    if (this.existingFournisseur ) {
      this.fournisseurForm.patchValue({
        nom: this.existingFournisseur.nom,
        adresse: this.existingFournisseur.adresse,
        tel: this.existingFournisseur.tel
      });
    }
  }
  onSubmit(){
    if(this.fournisseurForm.valid){
      const formData = this.fournisseurForm.value;
      console.log(this.fournisseurId)
      this.fournisseurService.updateFournisseur(formData,parseInt(this.fournisseurId)).subscribe(
        (response)=>{
          console.log("Fournisseur modifier envoyer avec success",response);
          this.router.navigate(['supplier/all']);
        },
        (error)=>{
          console.error('Erreur lors de envoi des données au backend', error);
          if (error.status === 400) {
            this.nameError = 'Le nom du fournisseur existe déjà. Veuillez en choisir un autre.';
          } else {
            this.nameError = 'Une erreur s\'est produite lors de l\'ajout du fournisseur.';
          }

        }
      )

    }

  }
}
