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

  constructor(private fournisseurService: FournisseurService) { }

  ngOnInit(): void {
    this.getFournisseurs();
  }
  getFournisseurs(){
    this.fournisseurService.getAllFournisseurs().subscribe(
      (data)=>{
        this.fournisseurs=data;
      },
      (error)=>{
        console.error('error lors de la recuperationde la liste des fournisseur',error);
      }
    )
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
