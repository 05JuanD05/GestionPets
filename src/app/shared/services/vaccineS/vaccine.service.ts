import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VaccineService {
  private collectionName = 'vacunas';

  constructor(private firestore: AngularFirestore) {}

  agregarVacuna(vacuna: any): Promise<void> {
    const id = this.firestore.createId(); // Crear un ID único
    return this.firestore.collection ('vacunas') .doc(id).set(vacuna);
  }

  obtenerVacunas(): Observable<any[]> {
    return this.firestore.collection('vacunas').valueChanges({ idField: 'id' });
  }

  eliminarVacuna(id: string): Promise<void> {
    return this.firestore.collection('vacunas').doc(id).delete();
  }

  actualizarVacuna(id: string, data: any): Promise<void> {
    return this.firestore.collection('vacunas').doc(id).update(data);
  }
}
