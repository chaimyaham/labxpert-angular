import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemsComponent } from './components/sidebar/sidebar-items/sidebar-items.component';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { AllPatientsComponent } from './components/patient/all-patients/all-patients.component';

import {PatientService} from "./services/patient.service";

import { AddUtilisateurComponent } from './components/utilitateur/add-utilisateur/add-utilisateur.component';
import { UpdatePatientComponent } from './components/patient/update-patient/update-patient.component';
import { FournisseurComponent } from './components/fournisseur/fournisseur.component';
import { AddFournisseurComponent } from './components/fournisseur/add-fournisseur/add-fournisseur.component';
import { UpdateFournisseurComponent } from './components/fournisseur/update-fournisseur/update-fournisseur.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactifComponent } from './components/reactif/reactif.component';
import { AddReactifComponent } from './components/reactif/add-reactif/add-reactif.component';
import { CommonModule, DatePipe } from '@angular/common';
import { UpdateReactifComponent } from './components/reactif/update-reactif/update-reactif.component';
import {AllUtilisateurComponent} from "./components/utilitateur/all-utilisateur/all-utilisateur.component";
import { UpdateUtilisateurComponent } from './components/utilitateur/update-utilisateur/update-utilisateur.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarItemsComponent,
    AddPatientComponent,
    AllPatientsComponent,
    AddUtilisateurComponent,
    UpdatePatientComponent,
    FournisseurComponent,
    AddFournisseurComponent,
    UpdateFournisseurComponent,
    ReactifComponent,
    AddReactifComponent,
    UpdateReactifComponent,
    AllUtilisateurComponent,
    UpdateUtilisateurComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],

  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
