import { TestBed } from '@angular/core/testing';
import { PatientService } from './patient.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Patient} from "../models/patient";


describe('PatientService', () => {
  let url = "http://localhost:8088/api/v1/patient";
  let service: PatientService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientService],

  });
  service = TestBed.inject(PatientService);
  httpTestingController = TestBed.inject(HttpTestingController);
  });
    it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('devrait récupérer la liste des patient', () => {
    service.getAll().subscribe((patients) => {
      console.log('Liste des patients :', patients);
      expect(patients.length).toBeGreaterThan(0);
    });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
  })
  it('devrait récupérer un patient par ID', () => {
    const idToGet = 1;
    const patients: Patient[] = [
      {
        id:1,
        nom:"kawtar",
        prenom:"haji",
        adresse:"casa",
        telephone:"1234567",
        sexe:"male",
      },
      {
        id:2,
        nom:"salma",
        prenom:"kali",
        adresse:"bm",
        telephone:"2344556",
        sexe:"FEMEL",
      },

    ];
    const dummyPatient: Patient = {
      id:1,
      nom:"kawtar",
      prenom:"haji",
      adresse:"casa",
      telephone:"1234567",
      sexe:"male",
    }

    service.getPatientById(idToGet).subscribe(patients => {
      expect(patients).toEqual(dummyPatient);
      const req = httpTestingController.expectOne(`${url}/${idToGet}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyPatient);


    });
  });
  it('devrait modifier un patient', () => {
    const idToUpdate = 3;
    const updatedPatient: Patient = {
      id:3,
      nom:"khawla",
      prenom:"mouslim",
      adresse:"marakech",
      telephone:"09348845340",
      sexe:"FEMELE"

    };

    service.update( idToUpdate,updatedPatient).subscribe((response) => {
      expect(response).toEqual(updatedPatient);
      const req = httpTestingController.expectOne(`${url}/${idToUpdate}`);
      expect(req.request.method).toBe('PUT');
      req.flush(updatedPatient);
    });
  });

  it('devrait supprimer un patient', () => {
    const idToDelete = 1;
    service.deletePatient(idToDelete).subscribe(() => {
      const req = httpTestingController.expectOne(`${url}/${idToDelete}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
