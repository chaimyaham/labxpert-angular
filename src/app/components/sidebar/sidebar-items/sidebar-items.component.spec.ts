import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarItemsComponent } from './sidebar-items.component';

describe('SidebarItemsComponent', () => {
  let component: SidebarItemsComponent;
  let fixture: ComponentFixture<SidebarItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
