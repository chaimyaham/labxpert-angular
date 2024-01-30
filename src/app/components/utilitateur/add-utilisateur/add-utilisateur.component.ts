import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {PatientService} from "../../../services/patient.service";
import {Router} from "@angular/router";
import {UtilisateurService} from "../../../services/utilisateur.service";

@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.css']
})
export class AddUtilisateurComponent implements OnInit {
  utilisateurForm!:FormGroup;
  nameError:string|null=null;
  constructor(private service:UtilisateurService,private router:Router,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.utilisateurForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],

      sexe: ['', Validators.required],

      UserRole: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]

    });
  }
  onSubmit(): void {

    if(this.utilisateurForm.valid){
      const formData = this.utilisateurForm.value;
      this.service.saveUtilisateur(formData).subscribe(
        (response)=>{
          console.log("Donnees des utilisateur envoyer avec success",response);
          this.router.navigate(['user/all']);
        },
        (error)=>{
          console.error('Erreur lors de envoi des données au backend', error);
          if (error.status === 400) {
            this.nameError = 'Le nom du utilisateur existe déjà. Veuillez en choisir un autre.';
          } else {
            this.nameError = 'Une erreur s\'est ' +
              'uitilisateur lors de l\'ajout du utilisateur.';
          }

        }
      )


    }
  }
}
