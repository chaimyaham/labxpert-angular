import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Echantillon} from 'src/app/models/echantillon.interface';
import {EchantillonService} from '../../../services/echantillon.service';
import {PatientService} from "../../../services/patient.service";
import {UtilisateurService} from "../../../services/utilisateur.service";
import EchantillonResponse from "../../../models/echantillonResponse";

declare const feather: any;

@Component({
  selector: 'app-list-echantillon',
  templateUrl: './list-echantillon.component.html',
  styleUrls: ['./list-echantillon.component.css']
})

export class ListEchantillonComponent implements OnInit, AfterViewInit {

  echantillons: EchantillonResponse[] = [];
  currentPage = 0;
  pageSize = 4; 
  echantillonsPages!: EchantillonResponse[][];

  constructor(private echantillonService: EchantillonService,
              private patientService: PatientService,
              private utilisateurService: UtilisateurService) {
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  ngOnInit(): void {
    this.echantillonService.getAllEchantillons().subscribe(
      (data) => {
        console.log(data);
        this.echantillons = data;
        this.echantillonsPages = this.paginateFournisseurs(this.echantillons, this.pageSize);

      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des échantillons :', error);

      }
    );
  }
  paginateFournisseurs(echantillons: EchantillonResponse[], pageSize: number): EchantillonResponse[][] {
    const pages = [];
    for (let i = 0; i < echantillons.length; i += pageSize) {
      pages.push(echantillons.slice(i, i + pageSize));
    }
    return pages;
  }
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    if (this.currentPage < this.echantillonsPages.length - 1) {
      this.currentPage++;
    }
  }


}
