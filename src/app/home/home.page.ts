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
    this.loadPets();
  }

  loadPets() {
    this.petService.getPets().subscribe(pets => {
      this.petList = pets;
    });
  }

  onSubmit() {
    if (this.petsForm.valid) {
      const petData = { ...this.petsForm.value, userId: this.userId };
  
      if (this.editIndex !== null) {
        this.petService.updatePet(this.editIndex, petData).subscribe(() => {
          this.loadPets(); // Recargar la lista
          this.editIndex = null; // Salir del modo de edición
        });
      } else {
        this.petService.addPet(petData).subscribe(() => {
          this.loadPets();
        });
      }
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

  onDeletePet(index: number) {
    this.petService.deletePet(index).subscribe(() => {
      this.loadPets();
    });
  }

}