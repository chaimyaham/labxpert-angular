import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactifComponent } from './reactif.component';

describe('ReactifComponent', () => {
  let component: ReactifComponent;
  let fixture: ComponentFixture<ReactifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
