import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetSService } from '../shared/services/petService/pet-s.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  petsForm: FormGroup;
  userId: string | undefined;
  filteredBreeds: { dogs: { label: string, value: string }[], cats: { label: string, value: string }[] } = { dogs: [], cats: [] };
  petList: any[] = [];
  editId: string | null = null;


  constructor(
  private formBuilder: FormBuilder, private petService: PetSService, private afAuth: AngularFireAuth){

  this.petsForm = this.formBuilder.group({
    name: ['', Validators.required],
    breed: ['', Validators.required],
    age: ['', Validators.required],
    birthdate: ['', Validators.required],
  });
  }


  ngOnInit(): void {
    // Obtener el ID del usuario logueado
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.loadPets(); // Cargar mascotas cuando se tenga el userId
      }
    });

    this.petService.getBreeds().subscribe((breeds) => {
      this.filteredBreeds = breeds;
    });
  }

  loadPets() {
    if (this.userId) {
      this.petService.getPets(this.userId).subscribe((pets) => {
        this.petList = pets;
      });
    }
  }

  onSubmit() {
    if (this.petsForm.valid && this.userId) { // Verifica que userId esté disponible
      const petData = { ...this.petsForm.value, userId: this.userId };

      if (this.editId !== null) {
        this.petService.updatePet(this.editId, petData).subscribe(() => {
          this.loadPets(); // Recargar la lista
          this.editId = null; // Salir del modo de edición
        });
      } else {
        this.petService.addPet(petData).subscribe(() => {
          this.loadPets();
        });
      }
      this.petsForm.reset();
    }
  }

  onEditPet(petId: string) {
    const pet = this.petList.find((p) => p.id === petId);
    if (pet) {
      this.petsForm.setValue({
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        birthdate: pet.birthdate,
      });
      this.editId = petId;
    }
  }

  onDeletePet(petId: string) {
    this.petService.deletePet(petId).subscribe(() => {
      this.loadPets();
    });
  }

}