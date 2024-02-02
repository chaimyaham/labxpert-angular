import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Echantillon} from "../../models/echantillon.interface";
import {Utilisateur} from "../../models/utilisateur";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {EchantillonService} from "../../services/echantillon.service";
import {PlanificationService} from "../../services/planification.service";
import {UtilisateurService} from "../../services/utilisateur.service";

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.css']
})
export class PlanificationComponent implements OnInit {



  constructor(

  ) { }

  ngOnInit(): void {


  }


}
