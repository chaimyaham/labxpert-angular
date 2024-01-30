import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Test } from 'src/app/models/Test';
import { TypeAnalyse } from 'src/app/models/typeAnalyse';

@Component({
  selector: 'app-add-analyse',
  templateUrl: './add-analyse.component.html',
  styleUrls: ['./add-analyse.component.css']
})
export class AddAnalyseComponent implements OnInit {
  tests: Test[]=[];
  typeAnalyses:TypeAnalyse[]=[];
  analyseForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.analyseForm = this.formBuilder.group({
      nomAnalyse: ['', Validators.required],
      typeAnalyse:['', Validators.required],
      nomTest:['',Validators.required],
      uniteTest : ['',Validators.required],
      valeurMin : [0,Validators.required],
      valeurMax: [0,Validators.required]
    });
   
  }

  addTest(){
    console.log(this.analyseForm.value)
    const nomTest = this.analyseForm.get('nomTest')?.value;
    if(nomTest===''){
      return 
    }
    const uniteTest = this.analyseForm.get('uniteTest')?.value;
    if(uniteTest===''){
      return 
    }
    const valeurMin = this.analyseForm.get('valeurMin')?.value;
    if(valeurMin===null){
      return 
    }
    const valeurMax = this.analyseForm.get('valeurMax')?.value;
    if(valeurMax===null){
      return 
    }
    
     this.tests.push({
      nom: nomTest,
      unit: uniteTest,
      minValue: valeurMin,
      maxValue: valeurMax
     })
     this.analyseForm.get('nomTest')?.reset();
     this.analyseForm.get('uniteTest')?.reset();
     this.analyseForm.get('valeurMin')?.reset();
     this.analyseForm.get('valeurMax')?.reset();
  }

  addTypeAnalyse(){
    console.log(this.analyseForm.get('typeAnalyse')?.value)
    const typeAnalyse = this.analyseForm.get('typeAnalyse')?.value;
    if(typeAnalyse===''){
      return 
    }
    this.typeAnalyses.push({
      nomType: typeAnalyse,
      tests : this.tests
    })
    this.tests=[];
    this.analyseForm.get('typeAnalyse')?.reset();
  }

  }

