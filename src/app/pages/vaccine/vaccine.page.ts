import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { VaccineService } from 'src/app/shared/services/vaccineS/vaccine.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html',
  styleUrls: ['./vaccine.page.scss'],
})
export class VaccinePage implements OnInit {
  public name!: FormControl;
  public date!: FormControl;
  public certificado!: FormControl;
  public agregarForm!: FormGroup;
  public vacunas: any[] = []; // Lista para almacenar las vacunas
  public editIndex: string | null = null; // ID de la vacuna que se va a editar
  userId: string | undefined;
  vaccinelist: any[] = []; 

  constructor(private vaccineService: VaccineService, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.name = new FormControl('');
    this.date = new FormControl('');
    this.certificado = new FormControl('');
    this.agregarForm = new FormGroup({
      name: this.name,
      date: this.date,
      certificado: this.certificado,
    });

   
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.loadvaccine(); 
      }
    });

  } 
  loadvaccine() {
    if (this.userId) {
      this.vaccineService.getVaccine(this.userId).subscribe((vaccine) => {
        this.vaccinelist = vaccine;
      });
    }
  }

  agregarVacuna() {
  
    const nuevaVacuna = {
      name: this.name.value,
      date: this.date.value,
      certificado: this.certificado.value,
      userId: this.userId             
    };

    if (this.editIndex) {
      // Actualizar vacuna
      this.vaccineService.actualizarVacuna(this.editIndex, nuevaVacuna).then(() => {
        this.editIndex = null; // Restablece el índice después de actualizar
      });
    } else {
      // Agregar nueva vacuna
      this.vaccineService.agregarVacuna(nuevaVacuna).then(() => {
        this.agregarForm.reset(); // Resetea el formulario después de agregar
      });
    }
  }

  eliminarVacuna(id: string) {
    this.vaccineService.eliminarVacuna(id).then(() => {
      console.log('Vacuna eliminada');
    });
  }

  editarVacuna(vacuna: any) {
    this.name.setValue(vacuna.name);
    this.date.setValue(vacuna.date);
    this.certificado.setValue(vacuna.certificado);
    this.editIndex = vacuna.id; // Guarda el ID para actualizar
  }
}
