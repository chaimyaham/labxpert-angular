import { AfterViewInit, Component } from '@angular/core';
declare const feather: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    feather.replace();
  }
  title = 'labxpert-angular';
}
