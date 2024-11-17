import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PetSService } from '../shared/services/petService/pet-s.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SupabaseService } from 'src/app/shared/services/storageS/supabase.service';
import { ToastService } from '../shared/services/toastS/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public image = new FormControl('');
  public name = new FormControl('', Validators.required);
  public breed = new FormControl('', Validators.required);
  public age = new FormControl('', Validators.required);
  public birthdate = new FormControl('', Validators.required);
  public petsForm = new FormGroup({
    image: this.image,
    name: this.name,
    breed: this.breed,
    age: this.age,
    birthdate: this.birthdate
  });

  userId: string | undefined;
  filteredBreeds: { dogs: { label: string, value: string }[], cats: { label: string, value: string }[] } = { dogs: [], cats: [] };
  petList: any[] = [];
  editId: string | null = null;
  selectedImage: File | null = null;

  constructor(
    private petService: PetSService, 
    private afAuth: AngularFireAuth, 
    private supabaseS: SupabaseService,
    private readonly toastMsj: ToastService
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.loadPets();
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
      
      this.toastMsj.mostrarToast('Mascota registrada exitosamente');
      
      try {
        if (this.selectedImage) {
          const uploadResult = await this.supabaseS.uploadFoto(this.selectedImage);
          if (uploadResult) {
            const imageUrl = await this.supabaseS.getFotoUrl(uploadResult.path);
            petData.image = imageUrl;
          }
        }

        if (this.editId !== null) {
          await this.petService.updatePet(this.editId, petData).toPromise();
          this.editId = null;
        } else {
          await this.petService.addPet(petData).toPromise();

        }

        this.petsForm.reset();
        this.selectedImage = null;
        this.loadPets();

      } catch (error) {
        console.error('Error saving pet:', error);
      }
    }else {
      this.toastMsj.mostrarToast('Error al registrar la mascota');
    }
  }

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
      this.toastMsj.mostrarToast('Mascota seleccionada para editar');
      this.editId = selectedPet.id;
    } else{
      
    }
  }
  
  onDeletePet(pet: any) {
    this.petService.deletePet(pet.id).subscribe(() => {
      this.loadPets();
      this.toastMsj.mostrarToast('Mascota eliminada con exito');
    });
  }  
}
