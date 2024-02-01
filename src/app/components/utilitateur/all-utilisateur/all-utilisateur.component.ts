import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Utilisateur} from "../../../models/utilisateur";
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
  currentPage = 0;
  pageSize = 4; 
  utilisateursPages!: Utilisateur[][];
  constructor(private utilisateurService: UtilisateurService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAll()
  }
  getAll() {
    this.utilisateurService.getAll().subscribe(
      (reponse: Utilisateur[]) => {
        this.utilisateurs = reponse
        this.utilisateursPages = this.paginateUtilisateur(this.utilisateurs, this.pageSize);
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
  paginateUtilisateur(utilisateurs: Utilisateur[], pageSize: number): Utilisateur[][] {
    const pages = [];
    for (let i = 0; i < utilisateurs.length; i += pageSize) {
      pages.push(utilisateurs.slice(i, i + pageSize));
    }
    return pages;
  }
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    if (this.currentPage < this.utilisateursPages.length - 1) {
      this.currentPage++;
    }
  }

}
