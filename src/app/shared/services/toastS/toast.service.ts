import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {}

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,  // Duración en milisegundos (2 segundos)
      position: 'bottom',  // Posición del toast: top, middle o bottom
      color: 'primary'  // Color del toast, puede ser primary, secondary, success, etc.
    });
    await toast.present();
  }
}
