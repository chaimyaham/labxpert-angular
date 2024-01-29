import { Component, NgModule, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-echantillon',
  templateUrl: './add-echantillon.component.html',
  styleUrls: ['./add-echantillon.component.css']
})

export class AddEchantillonComponent implements OnInit {
  selectedDate: Date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
