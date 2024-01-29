import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ReactifService } from 'src/app/services/reactif.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-reactif',
  templateUrl: './add-reactif.component.html',
  styleUrls: ['./add-reactif.component.css']
})
export class AddReactifComponent implements OnInit {
  fournisseurs : Fournisseur[]=[]
  reactifForm!: FormGroup 
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private fournisseurService : FournisseurService , 
    private reactifService : ReactifService,
    private router : Router,
    private datePipe: DatePipe
    
  
    ) { }

  ngOnInit(): void {
    this.fournisseurService.getAllFournisseurs().subscribe(
      data => {
        this.fournisseurs = data;
      },
      error => {
        console.log(error);
      }
    )
    this.initForm();
  }
  initForm(): void {
    this.reactifForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      fournisseurIdFournisseur: [null, Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
      dateExpiration: ['', Validators.required]
    });
  }
  onSubmit(){
    const formData = this.reactifForm.value;
    const dateTimeExpirationValue = this.datePipe.transform(formData.dateExpiration, 'yyyy-MM-ddTHH:mm:ss');
    const fournisseurIdFournisseurValue = parseInt(formData.fournisseurIdFournisseur);
    console.log(dateTimeExpirationValue, fournisseurIdFournisseurValue);

    const modifiedFormData = {
      nom: formData.nom,
      description: formData.description,
      fournisseurIdFournisseur: fournisseurIdFournisseurValue,
      quantite: formData.quantite,
      dateExpiration: dateTimeExpirationValue
    };
    this.reactifService.addReactif(modifiedFormData).subscribe(
      (response) => {
        console.log("Données du réactif envoyées avec succès", response);
        this.router.navigate(['reactif/all']);
      },
      (error) => {
        console.log(error.message);
        if (error.status === 400) {
          const errorMessage = error.error.message;
          console.log("Message d'erreur :", errorMessage);
  
          this.errorMessage = errorMessage;}
      }
    );

  }

}
