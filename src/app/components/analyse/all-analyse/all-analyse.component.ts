import { Component, OnInit } from '@angular/core';
import { TypeAnalyse } from 'src/app/models/typeAnalyse';
import { AnalyseService } from 'src/app/services/analyse.service';

@Component({
  selector: 'app-all-analyse',
  templateUrl: './all-analyse.component.html',
  styleUrls: ['./all-analyse.component.css']
})
export class AllAnalyseComponent implements OnInit {
  analyses: any[] = [];


  constructor(private analyseService : AnalyseService) { }

  ngOnInit(): void {
    this.getAllAnalyses();
   
  }
  getAllTestsOfATypeOfAnalyse(analyseid : number,typeAnalyse:any){
    this.analyseService.getAllTestOfATypeOfAnalyse(analyseid,typeAnalyse.id).subscribe(
      (response)=>{
        typeAnalyse.tests=response;
      },
      (error)=>{
        console.log(error)
      }
    )
    

  }
  getAllTypeAnalysesById(analyse : any) {
    this.analyseService.getAlltypeAnalyseByIdAnalyse(analyse.id).subscribe(
          (data) => {
            console.log(data);
            analyse.typeAnalyse=data;
            for(let typeAnalyse of analyse.typeAnalyse){
              this.getAllTestsOfATypeOfAnalyse(analyse.id,typeAnalyse);
             
            }
            console.log(analyse);
          },
          (error) => {
            console.error('error lors de la recuperation de la liste des analyses', error);
          }
        );
  }

  getAllAnalyses() {
    this.analyseService.getAllAnalyse().subscribe(
      (data)=>{
        this.analyses=data;
        console.log(this.analyses);
        for(let analyse of this.analyses){
          this.getAllTypeAnalysesById(analyse);
          
        }
      },
      (error)=>{
        console.error('error lors de la recuperationde la liste des analyse',error);
      }
    )
  }

}
