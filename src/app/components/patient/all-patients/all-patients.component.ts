import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../../services/patient.service";
import {Patient} from "../../../model/patient";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.css']
})
export class AllPatientsComponent implements OnInit {
  patients!: Patient[]
  searchForm!: FormGroup;

  constructor(private patientService: PatientService, private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.getAll()


  }

  getAll() {
    this.patientService.getAll().subscribe(
      (reponse: Patient[]) => {
        this.patients = reponse
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )


  }


  confirmAndDelete(patient:Patient): void {
    const confirmDelete = window.confirm('Voulez-vous vraiment supprimer ce patient ?');

    if (confirmDelete) {
      this.deletePatient(patient);
    }
  }
  deletePatient(patient:Patient){
    let index=this.patients.indexOf(patient);
    this.patientService.deletePatient(patient.id).subscribe(
      () => {
        console.log('paatient supprime avec succes');
        this.patients.splice(index,1)
      },
      (error) => {
        console.error('Erreur lors de la suppression du fournisseur', error);
      }
    )

  }



}
