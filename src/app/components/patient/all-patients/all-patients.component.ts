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
  patientUpdate={
    id:"",
    nom:"",
    prenom:"",
    adresse:"",
    telephone:"",
    sexe:"",

  }

  constructor(private patientService: PatientService, private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.getAll()
    this.initForm()

  }

  getAll() {
    this.patientService.getAll().subscribe(
      (reponse: Patient[]) => {
        this.patients = reponse
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );


  };
  initForm() {
    this.searchForm = this.fb.group({
      rechercher: ['', Validators.required]
    });
  }
  deletePatient(id: number) {
    this.patientService.deleteClient(id).subscribe(
      () => {
        // Supprimez le patient du tableau après la réussite de la requête de suppression
        this.patients = this.patients.filter(patient => patient.id !== id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  updatePatient(id:number,patient: Patient) {
    this.patientService.update(id, patient).subscribe(
      (updatedPatient: Patient) => {
        const index = this.patients.indexOf(patient);
        if (index !== -1) {
          this.patients[index] = updatedPatient;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }


}
