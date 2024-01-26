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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarItemsComponent,
    AddPatientComponent,
    AllPatientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
