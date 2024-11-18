import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
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
  imageSrc1: any;
  imageSrc2: any;
  filePath: any;
  public vacunas: any[] = []; // Lista para almacenar las vacunas
  public editIndex: string | null = null; // ID de la vacuna que se va a editar

  constructor(private vaccineService: VaccineService) {}

  ngOnInit() {
    this.name = new FormControl('');
    this.date = new FormControl('');
    this.certificado = new FormControl('');
    this.agregarForm = new FormGroup({
      name: this.name,
      date: this.date,
      certificado: this.certificado,
    });

    // Cargar vacunas desde Firebase
    this.vaccineService.obtenerVacunas().subscribe((data) => {
      this.vacunas = data;
    });
  }
  pickFiles = async () => {
    const result = await FilePicker.pickFiles({
      types: ['image/png'],
      readData: true
    });

    this.filePath = result.files[0].path;
    this.imageSrc1 = 'data:image/jpeg;base64,' + result.files[0].data;
  }

  pickImages = async () => {
    const result = await FilePicker.pickImages({
      readData: true
    });

    this.imageSrc1 = 'data:image/jpeg;base64,' + result.files[0].data;
    this.imageSrc2 = 'data:image/jpeg;base64,' + result.files[1].data;
  };

  pickPDFiles = async () => {
    const result = await FilePicker.pickFiles({
      types: ['aplication/pdf'],
      readData: true
    });

    result ? this.filePath = result.files[0].path : alert("No file path")
  }

  pickVideo = async () => {
    try {
      const result = await FilePicker.pickFiles({
        types: ['video/mp4']
      });

      this.filePath = result.files[0].path;
    } catch (error) {
      alert(JSON.stringify(error))
    }
  };

  openFile = async () => {
    try {
      await FileOpener.openFile({
        path: this.filePath,
      });
    } catch (error) {
      alert(error)
    };
  }

  agregarVacuna() {
    const nuevaVacuna = {
      name: this.name.value,
      date: this.date.value,
      certificado: this.certificado.value,
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
