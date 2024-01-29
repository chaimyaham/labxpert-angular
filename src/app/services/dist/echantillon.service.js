"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EchantillonService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_1 = require("src/environments/environment");
var EchantillonService = /** @class */ (function () {
    function EchantillonService(http) {
        this.http = http;
        this.apiUrl = environment_1.environment.apiUrl;
    }
    EchantillonService.prototype.getAllEchantillons = function () {
        return this.http.get("" + this.apiUrl).pipe(rxjs_1.catchError(this.handleErrors));
        ;
    };
    EchantillonService.prototype.getEchantillonById = function (id) {
        var echantillon = this.http.get(this.apiUrl + "/" + id);
        return echantillon;
    };
    EchantillonService.prototype.createEchantillon = function (echantillon) {
        return this.http.post("" + this.apiUrl, echantillon);
    };
    EchantillonService.prototype.updateEchantillon = function (id, echantillon) {
        return this.http.put(this.apiUrl + "/" + id, echantillon);
    };
    EchantillonService.prototype.deleteEchantillon = function (id) {
        return this.http["delete"](this.apiUrl + "/" + id);
    };
    EchantillonService.prototype.handleErrors = function (error) {
        console.error('Une erreur s\'est produite :', error);
        return rxjs_1.throwError(function () { return new Error('Erreur lors de la récupération des données.'); });
    };
    EchantillonService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EchantillonService);
    return EchantillonService;
}());
exports.EchantillonService = EchantillonService;
