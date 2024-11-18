import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
import { VaccineService } from 'src/app/shared/services/vaccineS/vaccine.service';
import { SupabaseService } from 'src/app/shared/services/storageS/supabase.service';
import { ToastService } from 'src/app/shared/services/toastS/toast.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html',
  styleUrls: ['./vaccine.page.scss'],
})
export class VaccinePage implements OnInit {
  public pdfFile: File | null = null;
  public name!: FormControl;
  public date!: FormControl;
  public certificado!: FormControl;
  public agregarForm!: FormGroup;
  imageSrc1: any;
  imageSrc2: any;
  filePath: any;
  public vacunas: any[] = []; // Lista para almacenar las vacunas
  public editIndex: string | null = null; // ID de la vacuna que se va a editar
  userId: string | undefined;
  vaccinelist: any[] = []; 

  constructor(
    private vaccineService: VaccineService,
    private afAuth: AngularFireAuth,
    private readonly supabaseService: SupabaseService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit() {
    this.name = new FormControl('', [Validators.required]);
    this.date = new FormControl('', [Validators.required]);
    this.certificado = new FormControl('', [Validators.required]);
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

  pickPDFiles = async () => {
    try {
      const result = await FilePicker.pickFiles({
        types: ['application/pdf'], // Corrección del tipo MIME
        readData: true
      });
  
      if (result?.files?.[0]?.path) {
        this.filePath = result.files[0].path;
      } else {
        this.toastService.show('No se seleccionó ningún archivo');
      }
    } catch (error) {
      console.error("Error al seleccionar archivo:", error);
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

  
  
  async agregarVacuna() {
    if (!this.agregarForm.valid) {
      this.toastService.show(`Campo "name": ${this.name.value} (${this.name.valid})`);
      this.toastService.show(`Campo "date": ${this.date.value} (${this.date.valid})`);
      this.toastService.show(`Campo "certificado": ${this.certificado.value} (${this.certificado.valid})`);

      this.toastService.show('Por favor, completa todos los campos.');
      return;
    }
  
    let pdfUrl: string | null = null;
    if (this.pdfFile) {
    pdfUrl = await this.supabaseService.uploadPDF(this.pdfFile);
    if (!pdfUrl) {
      this.toastService.show('Error al subir el PDF');
      return;
    }
  }
  
  const nuevaVacuna = {
    name: this.name.value,
    date: this.date.value,
    certificado: pdfUrl,
    userId: this.userId             
  };
  
  if (this.editIndex) {
    this.vaccineService.actualizarVacuna(this.editIndex, nuevaVacuna).then(() => {
      this.editIndex = null;
      this.agregarForm.reset();
    });
  } else {
    this.vaccineService.agregarVacuna(nuevaVacuna).then(() => {
      this.agregarForm.reset();
    });
  }
}

  onPDFSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.pdfFile = input.files[0]; // Guardar el archivo seleccionado
      this.certificado.setValue(this.pdfFile.name);
      this.toastService.show('Archivo fue seleccionado: ')
      console.log('Archivo seleccionado:', this.pdfFile.name);
    } else {
      this.pdfFile = null; // Restablecer si no se seleccionó nada
      this.certificado.setValue('');
      this.toastService.show('No se selecciono ningun archivo')
      console.warn('No se seleccionó ningún archivo');
    }
  }
  
  eliminarVacuna(id: string) {
    this.vaccineService.eliminarVacuna(id).then(() => {
      this.toastService.show('Vacula Eliminada')
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
