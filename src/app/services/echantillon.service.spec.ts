import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Echantillon } from 'src/app/models/echantillon.interface';
import { ReactifAnalyse } from 'src/app/models/reactifAnalyses.interface';
import 'jasmine';
import { EchantillonService } from './echantillon.service';
declare var done: Function;
describe('EchantillonService', () => {
  let apiUrl = 'http://localhost:8088/api/v1/echantillons';

  let service: EchantillonService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EchantillonService],
    });
    service = TestBed.inject(EchantillonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('devrait récupérer la liste des échantillons', () => {
    service.getAllEchantillons().subscribe((echantillons) => {
      console.log('Liste des échantillons :', echantillons);
      expect(echantillons.length).toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET');
  });
  it('devrait récupérer un échantillon par ID', () => {
    const idToGet = 1;
    const reactifAnalyses: ReactifAnalyse[] = [
      {
        id: 7,
        reactifIdReactif: 1,
        quantite: 3,
      },
      {
        id: 8,
        reactifIdReactif: 2,
        quantite: 2,
      },
      {
        id: 9,
        reactifIdReactif: 3,
        quantite: 2,
      },
    ];
    const dummyEchantillon: Echantillon = {
      id: idToGet,
      dateDeReception: new Date('2024-01-20T12:34:56'),
      echantillonCode: 'NAB3516',
      patientId: 3,
      utilisateurId: 1,
      assigned: true,
      createdAt: new Date('2024-01-28T20:31:26'),
      updatedAt: new Date('2024-01-28T20:31:26'),
      reactifAnalyses: reactifAnalyses,
    };

    service.getEchantillonById(idToGet).subscribe(echantillon => {
      expect(echantillon).toEqual(dummyEchantillon);

      const req = httpTestingController.expectOne(`${apiUrl}/${idToGet}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyEchantillon);

      done();
   });





  });

  afterEach(() => {
    httpTestingController.verify();
  });
});



