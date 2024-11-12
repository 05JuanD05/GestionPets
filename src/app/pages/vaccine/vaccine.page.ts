import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  public editIndex: number | null = null; // Índice de la vacuna que se va a editar

  constructor() { }

  ngOnInit() {
    this.name = new FormControl('');
    this.date = new FormControl('');
    this.certificado = new FormControl('');
    this.agregarForm = new FormGroup({
      name: this.name,
      date: this.date,
      certificado: this.certificado,
    });
  }

  agregarVacuna() {
    const nuevaVacuna = {
      name: this.name.value,
      date: this.date.value,
      certificado: this.certificado.value,
    };

    if (this.editIndex !== null) {
      // Si hay un índice de edición, actualiza la vacuna existente
      this.vacunas[this.editIndex] = nuevaVacuna;
      this.editIndex = null; // Restablece el índice después de actualizar
    } else {
      // Si no hay índice de edición, agrega una nueva vacuna
      this.vacunas.push(nuevaVacuna);
    }

    this.agregarForm.reset(); // Resetea el formulario después de agregar o editar
  }

  eliminarVacuna(index: number) {
    this.vacunas.splice(index, 1); // Elimina la vacuna de la lista
  }

  editarVacuna(index: number) {
    const vacuna = this.vacunas[index];
    this.name.setValue(vacuna.name);
    this.date.setValue(vacuna.date);
    this.certificado.setValue(vacuna.certificado);
    this.editIndex = index; // Guarda el índice para actualizar
  }
}
