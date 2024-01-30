import { Component, OnInit } from '@angular/core';
import {Patient} from "../../../model/patient";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Utilisateur} from "../../../model/utilisateur";
import {PatientService} from "../../../services/patient.service";
import {UtilisateurService} from "../../../services/utilisateur.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-all-utilisateur',
  templateUrl: './all-utilisateur.component.html',
  styleUrls: ['./all-utilisateur.component.css']
})
export class AllUtilisateurComponent implements OnInit {
  utilisateurs!: Utilisateur[]
  searchForm!: FormGroup;
  constructor(private utilisateurService: UtilisateurService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAll()
  }
  getAll() {
    this.utilisateurService.getAll().subscribe(
      (reponse: Utilisateur[]) => {
        this.utilisateurs = reponse
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }
  confirmAndDelete(utilisateur:Utilisateur): void {
    const confirmDelete = window.confirm('Voulez-vous vraiment supprimer ce utilisateur ?');

    if (confirmDelete) {
      this.deleteUtlisateur(utilisateur);
    }
  }
  deleteUtlisateur(utilisateur:Utilisateur){
    let index=this.utilisateurs.indexOf(utilisateur);
    this.utilisateurService.deleteUtilisatur(utilisateur.id).subscribe(
      () => {
        console.log('paatient supprime avec succes');
        this.utilisateurs.splice(index,1)
      },
      (error) => {
        console.error('Erreur lors de la suppression du utilisateur', error);
      }
    )

  }

}
