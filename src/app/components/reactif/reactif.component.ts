import { Component, OnInit } from '@angular/core';
import { Fournisseur } from 'src/app/models/fournisseur';
import { Reactif } from 'src/app/models/reactif';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ReactifService } from 'src/app/services/reactif.service';

@Component({
  selector: 'app-reactif',
  templateUrl: './reactif.component.html',
  styleUrls: ['./reactif.component.css']
})
export class ReactifComponent implements OnInit {
  reactifs :Reactif[]=[]
  fournisseurs:Fournisseur[]=[]
  constructor(
      private reactifService: ReactifService,  
      private fournisseurService : FournisseurService) { }

  ngOnInit(): void {
    this.getReactif();
  }
  getReactif(){
    this.reactifService.getAllReactifs().subscribe(
      (response)=>{
        this.reactifs=response;
        for(let reactif of this.reactifs){
            this.fournisseurService.getFournisseurById(reactif.fournisseurIdFournisseur).subscribe(
              (response)=>{
                this.fournisseurs.push(response);
              },(error)=>{
                console.log(error)
              }
            );

        }
      },
      (error)=>{
        console.error('error lors de la recuperationde la liste des reactifs',error);
      }
    )

  }
  confirmAndDelete(reactif:Reactif): void {
    const confirmDelete = window.confirm('Voulez-vous vraiment supprimer ce reactif ?');

    if (confirmDelete) {
      this.deleteReactif(reactif);
    }
  }
  deleteReactif(reactif:Reactif){
    let index=this.reactifs.indexOf(reactif);
    this.reactifService.deleteReactif(reactif.idReactif).subscribe(
      () => {
        console.log('reactif supprime avec succes');
        this.reactifs.splice(index,1)
      },
      (error) => {
        console.error('Erreur lors de la suppression du reactif', error);
      }
    )

  }

}
