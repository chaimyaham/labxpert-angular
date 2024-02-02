import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../../services/patient.service";

import {Patient} from "../../../models/patient";

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
  currentPage = 0;
  pageSize = 4; 
  patientsPages!: Patient[][];
  constructor(private patientService: PatientService, private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.getAll()


  }

  getAll() {
    this.patientService.getAll().subscribe(
      (reponse: Patient[]) => {
        this.patients = reponse
        this.patientsPages=this.paginatePatient(this.patients,this.pageSize)
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
  paginatePatient(patients: Patient[], pageSize: number): Patient[][] {
    const pages = [];
    for (let i = 0; i < patients.length; i += pageSize) {
      pages.push(patients.slice(i, i + pageSize));
    }
    return pages;
  }
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    if (this.currentPage < this.patientsPages.length - 1) {
      this.currentPage++;
    }
  }



}
