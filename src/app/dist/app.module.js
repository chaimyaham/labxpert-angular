"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var header_component_1 = require("./components/header/header.component");
var navbar_component_1 = require("./components/header/navbar/navbar.component");
var sidebar_component_1 = require("./components/sidebar/sidebar.component");
var sidebar_items_component_1 = require("./components/sidebar/sidebar-items/sidebar-items.component");
var add_patient_component_1 = require("./components/patient/add-patient/add-patient.component");
var all_patients_component_1 = require("./components/patient/all-patients/all-patients.component");
var add_analyse_component_1 = require("./components/analyse/add-analyse/add-analyse.component");
var all_analyse_component_1 = require("./components/analyse/all-analyse/all-analyse.component");
var add_echantillon_component_1 = require("./components/echantillon/add-echantillon/add-echantillon.component");
var list_echantillon_component_1 = require("./components/echantillon/list-echantillon/list-echantillon.component");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var fournisseur_component_1 = require("./components/fournisseur/fournisseur.component");
var add_fournisseur_component_1 = require("./components/fournisseur/add-fournisseur/add-fournisseur.component");
var update_fournisseur_component_1 = require("./components/fournisseur/update-fournisseur/update-fournisseur.component");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var reactif_component_1 = require("./components/reactif/reactif.component");
var add_reactif_component_1 = require("./components/reactif/add-reactif/add-reactif.component");
var common_1 = require("@angular/common");
var update_reactif_component_1 = require("./components/reactif/update-reactif/update-reactif.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                navbar_component_1.NavbarComponent,
                sidebar_component_1.SidebarComponent,
                sidebar_items_component_1.SidebarItemsComponent,
                add_patient_component_1.AddPatientComponent,
                all_patients_component_1.AllPatientsComponent,
                add_analyse_component_1.AddAnalyseComponent,
                all_analyse_component_1.AllAnalyseComponent,
                add_echantillon_component_1.AddEchantillonComponent,
                list_echantillon_component_1.ListEchantillonComponent,
                fournisseur_component_1.FournisseurComponent,
                add_fournisseur_component_1.AddFournisseurComponent,
                update_fournisseur_component_1.UpdateFournisseurComponent,
                reactif_component_1.ReactifComponent,
                add_reactif_component_1.AddReactifComponent,
                update_reactif_component_1.UpdateReactifComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule, forms_1.FormsModule,
                datepicker_1.BsDatepickerModule.forRoot(),
            ],
            providers: [common_1.DatePipe],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
