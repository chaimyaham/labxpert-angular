import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { AllPatientsComponent } from './components/patient/all-patients/all-patients.component';
import { AddAnalyseComponent } from './components/analyse/add-analyse/add-analyse.component';
import { AddEchantillonComponent } from './components/echantillon/add-echantillon/add-echantillon.component';
import { ListEchantillonComponent } from './components/echantillon/list-echantillon/list-echantillon.component';

const routes: Routes = [
  { path: 'addPatient', component: AddPatientComponent },
  { path: 'patient/all', component: AllPatientsComponent },
  { path: 'addAnalyse', component: AddAnalyseComponent },
  { path: 'addEchantillon', component: AddEchantillonComponent },
  { path: 'echantillon/all', component: ListEchantillonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
