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
import { AddAnalyseComponent } from './components/analyse/add-analyse/add-analyse.component';
import { AllAnalyseComponent } from './components/analyse/all-analyse/all-analyse.component';
import { AddEchantillonComponent } from './components/echantillon/add-echantillon/add-echantillon.component';
import { ListEchantillonComponent } from './components/echantillon/list-echantillon/list-echantillon.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EchantillonService } from '../app/services/echantillon.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarItemsComponent,
    AddPatientComponent,
    AllPatientsComponent,
    AddAnalyseComponent,
    AllAnalyseComponent,
    AddEchantillonComponent,
    ListEchantillonComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
    HttpClientModule
  ],
  providers: [EchantillonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
