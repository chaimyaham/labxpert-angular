import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { AllPatientsComponent } from './components/patient/all-patients/all-patients.component';
import { FournisseurComponent } from './components/fournisseur/fournisseur.component';
import { AddFournisseurComponent } from './components/fournisseur/add-fournisseur/add-fournisseur.component';
import { UpdateFournisseurComponent } from './components/fournisseur/update-fournisseur/update-fournisseur.component';
import { ReactifComponent } from './components/reactif/reactif.component';
import { AddReactifComponent } from './components/reactif/add-reactif/add-reactif.component';
import { UpdateReactifComponent } from './components/reactif/update-reactif/update-reactif.component';

const routes: Routes = [
  { path: 'addPatient', component: AddPatientComponent },
  { path: 'patient/all', component: AllPatientsComponent },
  { path: 'addSupplier', component: AddFournisseurComponent },
  { path: 'supplier/all', component: FournisseurComponent },
  { path: 'updateSupplier/:id', component: UpdateFournisseurComponent },
  { path: 'reactif/all', component: ReactifComponent },
  { path: 'addReactif', component: AddReactifComponent },
  { path: 'updateReactif/:id', component: UpdateReactifComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
