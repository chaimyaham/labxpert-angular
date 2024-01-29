import { TestBed } from '@angular/core/testing';

import { FournisseurService } from './fournisseur.service';
import { HttpClient } from '@angular/common/http';
import { Fournisseur } from '../models/fournisseur';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FournisseurService', () => {
  let apiUrl = `${environment.apiUrl}fournisseur`;
  let service: FournisseurService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FournisseurService],
    });
    service = TestBed.inject(FournisseurService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  describe('getAllFournisseurs()', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('devrait récupérer la liste des Fournissuer', () => {
      service.getAllFournisseurs().subscribe((fournisseurs) => {
        console.log('Liste des fournisseurs :', fournisseurs);
        expect(fournisseurs.length).toBeGreaterThan(0);
      });
      const req = httpTestingController.expectOne(apiUrl);
      expect(req.request.method).toEqual('GET');
    })
    it('devrait récupérer un échantillon par ID', () => {
      const idToGet = 1;
      const fournisseurs: Fournisseur[] = [
        {
          idFournisseur: 1,
          nom: "fournisseur1",
          adresse: "address1",
          tel: "+21200220022",
          deleted: false,
        },
        {
          idFournisseur: 2,
          nom: "fournisseur2",
          adresse: "address2",
          tel: "+2121111111",
          deleted: false,
        },
        {
          idFournisseur: 3,
          nom: "fournisseur3",
          adresse: "address3",
          tel: "+21233333333",
          deleted: false,
        }
      ];
      const dummyFournisseur: Fournisseur = {
        idFournisseur: 1,
        nom: "fournisseur1",
        adresse: "address1",
        tel: "+21200220022",
        deleted: false,
      }

      service.getFournisseurById(idToGet).subscribe(fournisseurs => {
        expect(fournisseurs).toEqual(dummyFournisseur);
        const req = httpTestingController.expectOne(`${apiUrl}/${idToGet}`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyFournisseur);
        

      });
    });

    it('devrait modifier un fournisseur',()=>{
      const idToUpdate=1;

    })

  })
   
})
