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
  currentPage = 0;
  pageSize = 3; 
  reactifPages!: Reactif[][];
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
        this.reactifPages = this.paginateReactif(this.reactifs, this.pageSize);
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
  paginateReactif(reactifs: Reactif[], pageSize: number): Reactif[][] {
    const pages = [];
    for (let i = 0; i < reactifs.length; i += pageSize) {
      pages.push(reactifs.slice(i, i + pageSize));
    }
    return pages;
  }
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    if (this.currentPage < this.reactifPages.length - 1) {
      this.currentPage++;
    }
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
