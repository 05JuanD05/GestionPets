import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html',
  styleUrls: ['./vaccine.page.scss'],
  providers: [DatePipe]
})
export class VaccinePage implements OnInit {
  public name!: FormControl;
  public date!: FormControl;
  public certificado!: FormControl;
  public agregarForm!: FormGroup;
  public vacunas: any[] = [];
  public editIndex: number | null = null;

  constructor(private datePipe: DatePipe) { }

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
    const formattedDate = this.datePipe.transform(this.date.value, 'dd/MM/yyyy'); // Asegura que la fecha esté formateada
    const nuevaVacuna = {
      name: this.name.value,
      date: formattedDate,
      certificado: this.certificado.value,
    };

    if (this.editIndex !== null) {
      this.vacunas[this.editIndex] = nuevaVacuna;
      this.editIndex = null;
    } else {
      this.vacunas.push(nuevaVacuna);
    }

    this.agregarForm.reset();
  }

  eliminarVacuna(index: number) {
    this.vacunas.splice(index, 1);
  }

  editarVacuna(index: number) {
    const vacuna = this.vacunas[index];
    this.name.setValue(vacuna.name);
    this.date.setValue(vacuna.date);
    this.certificado.setValue(vacuna.certificado);
    this.editIndex = index;
  }
}
