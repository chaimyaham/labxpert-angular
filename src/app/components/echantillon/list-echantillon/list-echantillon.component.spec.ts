import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEchantillonComponent } from './list-echantillon.component';

describe('ListEchantillonComponent', () => {
  let component: ListEchantillonComponent;
  let fixture: ComponentFixture<ListEchantillonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEchantillonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEchantillonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
