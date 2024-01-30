import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Fournisseur} from "../../../models/fournisseur";
import {Utilisateur} from "../../../model/utilisateur";
import {FournisseurService} from "../../../services/fournisseur.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilisateurService} from "../../../services/utilisateur.service";

@Component({
  selector: 'app-update-utilisateur',
  templateUrl: './update-utilisateur.component.html',
  styleUrls: ['./update-utilisateur.component.css']
})
export class UpdateUtilisateurComponent implements OnInit {
  utilisateurForm!: FormGroup;
  nameError: string | null = null;
  existingUtilisateur!: Utilisateur ;
  utilisateurId!: string;
  constructor(private formBuilder: FormBuilder,private utilisateurservice : UtilisateurService,private router: Router , private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe(params => {
      this.utilisateurId = params['id'];
      this.utilisateurservice.getUtilisateurById(parseInt(this.utilisateurId)).subscribe(
        (utilisateur: Utilisateur) => {
          this.existingUtilisateur = utilisateur;
          this.updateForm();
        },
        error => {
          console.error("Erreur lors de la récupération du utlisateur :", error);
        }
      );
    });
  }
  initForm(): void {
    this.utilisateurForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      UserRole: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  updateForm(): void {
    if (this.existingUtilisateur && this.utilisateurForm) {
      this.utilisateurForm.patchValue({
        nom: this.existingUtilisateur.nom,
        prenom: this.existingUtilisateur.prenom,
        adresse: this.existingUtilisateur.adresse,
        telephone: this.existingUtilisateur.telephone,
        UserRole: this.existingUtilisateur.UserRole,
        userName: this.existingUtilisateur.userName,
        password: this.existingUtilisateur.password,
      });
    }
  }
  onSubmit(){
    if(this.utilisateurForm.valid){
      const formData = this.utilisateurForm.value;
      console.log(this.utilisateurId)
      this.utilisateurservice.update(parseInt(this.utilisateurId),formData).subscribe(
        (response)=>{
          console.log("utilisateur modifier envoyer avec success",response);
          this.router.navigate(['utilisateur/update']);
        },
        (error)=>{
          console.error('Erreur lors de envoi des données au backend', error);
          if (error.status === 400) {
            this.nameError = 'Le nom duutilisateur existe déjà. Veuillez en choisir un autre.';
          } else {
            this.nameError = 'Une erreur s\'est produite lors de l\'ajout du utilisateur.';
          }

        }
      )

    }

  }

}
