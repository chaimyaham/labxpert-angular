import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Patient} from "../../../models/patient";

import {PatientService} from "../../../services/patient.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
  patientForm!: FormGroup;
  nameError: string | null = null;
  existingPatient!: Patient ;
  patientId!: string;

  constructor(private formBuilder: FormBuilder,private patientService :PatientService,private router: Router , private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe(params => {
      this.patientId = params['id'];
      this.patientService.getPatientById(parseInt(this.patientId)).subscribe(
        (patient: Patient) => {console.log(patient)
          this.existingPatient = patient;
          this.updateForm();
        },
        error => {
          console.error("Erreur lors de la récupération du patient :", error);
        }
      );
    });
  }
  initForm(): void {
    this.patientForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required]
    });

  }
  updateForm(): void {
    if (this.existingPatient) {
      this.patientForm.patchValue({
        nom: this.existingPatient.nom,
        prenom: this.existingPatient.prenom,
        adresse: this.existingPatient.adresse,
        telephone: this.existingPatient.telephone
      });
    }
  }
  onSubmit(){
    if(this.patientForm.valid){
      const formData = this.patientForm.value;
      console.log(this.patientId)
      this.patientService.update(parseInt(this.patientId),formData).subscribe(
        (response)=>{
          console.log("patient modifier envoyer avec success",response);
          this.router.navigate(['patient/update']);
        },
        (error)=>{
          console.error('Erreur lors de envoi des données au backend', error);
          if (error.status === 400) {
            this.nameError = 'Le nom du patient existe déjà. Veuillez en choisir un autre.';
          } else {
            this.nameError = 'Une erreur s\'est produite lors de l\'ajout du patient.';
          }

        }
      )

    }

  }

}

