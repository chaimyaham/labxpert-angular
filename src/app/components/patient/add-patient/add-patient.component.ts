import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../../services/patient.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  patientForm!:FormGroup;
  nameError:string|null=null;
  constructor(private service:PatientService,private router:Router,private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.patientForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      sexe: ['', Validators.required]

    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      const formData=this.patientForm.value;

      console.log(formData);
      this.service.savePatient(formData).subscribe({
        next:(response) => {
          console.log('Patient ajouté avec succès', response);
          this.router.navigate(["/patient/all"]);
        },
        error:(error) => {
          console.error('Erreur lors de l ajout du patient', error);
        }

    } );
    }
  }


}


