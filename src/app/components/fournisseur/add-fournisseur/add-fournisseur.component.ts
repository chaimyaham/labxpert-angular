import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FournisseurService } from 'src/app/services/fournisseur.service';



@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.css']
})
export class AddFournisseurComponent implements OnInit {
  fournisseurForm!: FormGroup;
  nameError: string | null = null;

  constructor(private formBuilder: FormBuilder,private fournisseurService : FournisseurService,private router: Router) { }
 
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.fournisseurForm = this.formBuilder.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      tel: ['', Validators.required]
    });
  }
  onSubmit(): void {

    if(this.fournisseurForm.valid){
      const formData = this.fournisseurForm.value;
      this.fournisseurService.addFournisseur(formData).subscribe(
        (response)=>{
          console.log("Donnees des fournisseur envoyer avec success",response);
          this.router.navigate(['supplier/all']); 
        },
        (error)=>{
          console.error('Erreur lors de envoi des données au backend', error);
          if (error.status === 400) {
            this.nameError = 'Le nom du fournisseur existe déjà. Veuillez en choisir un autre.';
          } else {
            this.nameError = 'Une erreur s\'est produite lors de l\'ajout du fournisseur.';
          }
          
        }
      )

    }
  }
  

}
