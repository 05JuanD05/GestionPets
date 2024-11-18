import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

export interface vaccinData {
  name: string;
  date: number;
 
}

@Injectable({
  providedIn: 'root',
})
export class VaccineService {
  private collectionName = 'vacunas';

  constructor(private firestore: AngularFirestore) {}

  agregarVacuna(vacuna: any): Promise<void> {
    const id = this.firestore.createId(); // Crear un ID único
    return this.firestore.collection ('vaccine') .doc(id).set(vacuna);
  }

  obtenerVacunas(): Observable<any[]> {
    return this.firestore.collection('vaccine').valueChanges({ idField: 'id' });
  }

  eliminarVacuna(id: string): Promise<void> {
    return this.firestore.collection('vaccine').doc(id).delete();
  }

  actualizarVacuna(id: string, data: any): Promise<void> {
    return this.firestore.collection('vaccine').doc(id).update(data);
  }
  getVaccine(userId: string): Observable<any[]> {
    return this.firestore.collection('vaccine', ref => ref.where('userId', '==', userId))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as vaccinData;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
}
