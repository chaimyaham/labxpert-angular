import { Component, OnInit } from '@angular/core';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];
  currentPage = 0;
  pageSize = 4; 
  fournisseursPages!: Fournisseur[][];
  constructor(private fournisseurService: FournisseurService) { }

  ngOnInit(): void {
    this.getFournisseurs();
  }
  getFournisseurs(){
    this.fournisseurService.getAllFournisseurs().subscribe(
      (data)=>{
        this.fournisseurs=data;
        this.fournisseursPages = this.paginateFournisseurs(this.fournisseurs, this.pageSize);
      },
      (error)=>{
        console.error('error lors de la recuperationde la liste des fournisseur',error);
      }
    )
  }
  paginateFournisseurs(fournisseurs: Fournisseur[], pageSize: number): Fournisseur[][] {
    const pages = [];
    for (let i = 0; i < fournisseurs.length; i += pageSize) {
      pages.push(fournisseurs.slice(i, i + pageSize));
    }
    return pages;
  }
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    if (this.currentPage < this.fournisseursPages.length - 1) {
      this.currentPage++;
    }
  }
  confirmAndDelete(fournisseur:Fournisseur): void {
    const confirmDelete = window.confirm('Voulez-vous vraiment supprimer ce fournisseur ?');

    if (confirmDelete) {
      this.deleteFournisseur(fournisseur);
    }
  }

  deleteFournisseur(fournisseur:Fournisseur){
    let index=this.fournisseurs.indexOf(fournisseur);
    this.fournisseurService.deleteFournisseur(fournisseur.idFournisseur).subscribe(
      () => {
        console.log('Fournisseur supprime avec succes');
        this.fournisseurs.splice(index,1)
      },
      (error) => {
        console.error('Erreur lors de la suppression du fournisseur', error);
      }
    )

  }

}
