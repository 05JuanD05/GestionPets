import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private readonly FireStore: AngularFirestore) { }

  async registerUsuarios(userId: string, email: string, imageFile: string, userData: any): Promise<void> {
    try {
      await this.FireStore.collection('users').doc(userId).set({
        email,
        image: imageFile,
        name: userData.name,
        lastName: userData.lastName,
        age: userData.age,
        phone: userData.phone,
      });
      console.log('Usuario Registrado en Firestore');
    } catch (error) {
      console.error('Error al Registrar el usuario', error);
      throw error;
    }
  }
}
