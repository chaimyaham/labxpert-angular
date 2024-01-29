import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { AllPatientsComponent } from './components/patient/all-patients/all-patients.component';
import _default from "chart.js/dist/core/core.layouts";
import update = _default.update;
import {UpdatePatientComponent} from "./components/patient/update-patient/update-patient.component";
import {AddUtilisateurComponent} from "./components/utilitateur/add-utilisateur/add-utilisateur.component";

const routes: Routes = [
  { path: 'addPatient', component: AddPatientComponent },
  { path: 'patient/all', component: AllPatientsComponent },
  { path: 'patient/update/:id', component: UpdatePatientComponent },
  { path: 'addUser', component: AddUtilisateurComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
