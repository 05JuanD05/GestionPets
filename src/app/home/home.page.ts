import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PetSService } from '../shared/services/petService/pet-s.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SupabaseService } from 'src/app/shared/services/storageS/supabase.service';

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
  selectedImage: File | null = null;


  constructor(
  private formBuilder: FormBuilder, private petService: PetSService, private afAuth: AngularFireAuth, 
  private supabaseS: SupabaseService)
  {

    this.petsForm = this.formBuilder.group({
      image: [''], 
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

  async onSubmit() {
    if (this.petsForm.valid && this.userId) {
      const petData = { ...this.petsForm.value, userId: this.userId };
      
      try {
        // Manejar la imagen
        if (this.selectedImage) {
          const uploadResult = await this.supabaseS.uploadFoto(this.selectedImage);
          if (uploadResult) {
            const imageUrl = await this.supabaseS.getFotoUrl(uploadResult.path);
            petData.image = imageUrl;
          }
        }

        // Guardar en Firebase
        if (this.editId !== null) {
          await this.petService.updatePet(this.editId, petData).toPromise();
          this.editId = null;
        } else {
          await this.petService.addPet(petData).toPromise();
        }

        // Limpiar el formulario y la imagen seleccionada
        this.petsForm.reset();
        this.selectedImage = null;
        
        // Limpiar el avatar si existe
        const imageAvatar = document.querySelector('app-avatar');
        if (imageAvatar) {
          (imageAvatar as any).image = "https://ionicframework.com/docs/img/demos/avatar.svg";
        }
        
        this.loadPets();

      } catch (error) {
        console.error('Error al guardar la mascota:', error);
      }
    }
  }

  // Método auxiliar para crear FormControl para las imágenes en la lista
  getImageControl(imageUrl: string): FormControl {
    return new FormControl(imageUrl);
  }

  onEditPet(pet: any) {
    const selectedPet = this.petList.find(p => p.id === pet.id);
    if (selectedPet) {
      this.petsForm.setValue({
        image: selectedPet.image,
        name: selectedPet.name,
        breed: selectedPet.breed,
        age: selectedPet.age,
        birthdate: selectedPet.birthdate
      });
      this.editId = selectedPet.id;  // Aseguramos que editId sea el ID correcto de Firebase
    }
  }
  
  onDeletePet(pet: any) {
    this.petService.deletePet(pet.id).subscribe(() => {
      this.loadPets(); // Recargar la lista después de eliminar
    });
  }  

}