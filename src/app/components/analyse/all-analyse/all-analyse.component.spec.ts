import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnalyseComponent } from './all-analyse.component';

describe('AllAnalyseComponent', () => {
  let component: AllAnalyseComponent;
  let fixture: ComponentFixture<AllAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAnalyseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
