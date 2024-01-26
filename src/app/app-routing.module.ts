import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { AllPatientsComponent } from './components/patient/all-patients/all-patients.component';

const routes: Routes = [
  { path: 'addPatient', component: AddPatientComponent },
  { path: 'patient/all', component: AllPatientsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
