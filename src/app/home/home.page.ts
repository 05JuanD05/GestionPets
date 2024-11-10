import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetSService } from '../shared/services/petService/pet-s.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  petsForm: FormGroup;
  userId!: string;
  filteredBreeds: { dogs: { label: string, value: string }[], cats: { label: string, value: string }[] } = { dogs: [], cats: [] };
  petList: any[] = [];
  editIndex: number | null = null;  

  constructor(
  private formBuilder: FormBuilder, private petService: PetSService 
  ){

  this.petsForm = this.formBuilder.group({
    name: ['', Validators.required],
    breed: ['', Validators.required],
    age: ['', Validators.required],
    birthdate: ['', Validators.required],
  });
  }


  ngOnInit(): void {
    this.petService.getBreeds().subscribe(breeds => {
      this.filteredBreeds = breeds;
  });
  }


  async onSubmit() {
    if (this.petsForm.valid) {
      const petData = { 
        ...this.petsForm.value,
        userId: this.userId
      };
  
      // Si estás en modo de edición, reemplaza el elemento en `petList`
      if (this.editIndex !== null) {
        this.petList[this.editIndex] = petData;
        this.editIndex = null; // Salir del modo de edición
      } else {
        // Si no estás en modo de edición, agrega la nueva mascota a `petList`
        this.petList.push(petData);
      }
  
      // Limpia el formulario después de enviar los datos
      this.petsForm.reset();
    }
  }
  


  onEditPet(index: number) {
    const pet = this.petList[index]; 
    this.petsForm.setValue({
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      birthdate: pet.birthdate
    });
    this.editIndex = index;
  }


  async onDeletePet(index: number) {
  }

}