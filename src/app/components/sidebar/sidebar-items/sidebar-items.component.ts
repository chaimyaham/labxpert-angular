import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface RouteItem {
  name: string;
  path: string;
}
@Component({
  selector: 'app-sidebar-items',
  templateUrl: './sidebar-items.component.html',
  styleUrls: ['./sidebar-items.component.css']
})

export class SidebarItemsComponent{
  @Input() groupeName: string = 'patient Groupe';
  @Input() groupeTitle: string = 'Patient';
  @Input() icon: string = 'activity';
  @Input() routes: RouteItem[] = []
  collapseId: string = `collapse${Math.floor(Math.random() * 1000)}`;
  constructor(private router: Router) {}

  navigateToRoute(route: RouteItem) {
 
    console.log(`Navigating to route: ${route.path}`);
    this.router.navigate([route.path]);
}
}
