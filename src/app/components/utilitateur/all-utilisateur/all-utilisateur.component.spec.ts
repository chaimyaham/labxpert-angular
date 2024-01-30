import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUtilisateurComponent } from './all-utilisateur.component';

describe('AllUtilisateurComponent', () => {
  let component: AllUtilisateurComponent;
  let fixture: ComponentFixture<AllUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
