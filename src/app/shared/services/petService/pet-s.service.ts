import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';


export interface PetData {
  name: string;
  age: number;
  breed: string;
  // Otros campos que tenga tu documento de mascota
}


@Injectable({
  providedIn: 'root'
})
export class PetSService {

  private petsCollection: AngularFirestoreCollection<any>;

  private dogBreeds = [
    { label: 'Labrador', value: 'Labrador'},
    { label: 'Rottweiler', value: 'rottweiler'},
    { label: 'Pit Bull', value: 'Pit Bull'},
    { label: 'Golden Retriever', value: 'Golden Retriever'},
    { label: 'Husky Siberiano', value: 'Husky Siberiano'},
    { label: 'Pastor Alemán', value: 'Pastor Alemán'}, 
    { label: 'Dalmata', value: 'Dalmata'},
    { label: 'Husky Siberiano', value: 'Husky Siberiano'},
    { label: 'Golden Retriever', value: 'Golden Retriever'},
    { label: 'Beagle', value: 'Beagle'},
    { label: 'Toy Poodle', value: 'Toy Poodle'},
    { label: 'Dobermann', value: 'Dobermann'},
    { label: 'Papillon', value: 'Papillon'},
    { label: 'Boston Terrier', value: 'Boston Terrier'},
    { label: 'Cavalier King Charles Spaniel', value: 'Cavalier King Charles Spaniel'},
    { label: 'Maltes', value: 'Maltes'},
    { label: 'Pug', value: 'Pug'},
    { label: 'Dachshund Miniatura', value: 'Dachshund Miniatura'},
    { label: 'Shih Tzu', value: 'Shih Tzu'},
    { label: 'Bichon Frise', value: 'Bichon Frise'},
    { label: 'Yorkshire Terrier', value: 'Yorkshire Terrier'},
    { label: 'Pomerania', value: 'Pomerania'},
    { label: 'chihuahua', value:'chihuahua'}
    ];

  private catBreeds = [
    {label:'Siamese', value:'Siamese'},
    {label:'Persian', value:'Persian'},
    {label:'Maine Coon', value:'Maine Coon'},
    {label:'Singapura', value:'Singapura'},
    {label:'Munchkin', value:'Munchkin'},
    {label:'Cornish Rex', value:'Cornish Rex'},
    {label:'Devon Rex', value:'Devon Rex'},
    {label:'American Curl', value:'American Curl'},
    {label:'Burmés', value:'Burmés'},
    {label:'Oriental de pelo corto', value:'Oriental de pelo corto'},
    {label:'Sphynx', value:'Sphynx'},
    {label:'Scottish Fold', value:'Scottish Fold'},
    {label:'Tonkinés', value:'Tonkinés'},
    {label:'Abisinio', value:'Abisinio'},
    {label:'Rex Selkirk', value:'Rex Selkirk'},
    ];


    constructor(private firestore: AngularFirestore) {
      this.petsCollection = this.firestore.collection('Pets');
    }


    getBreeds(): Observable<{ dogs: { label: string, value: string }[], cats: { label: string, value: string }[] }> {
      return of({
        dogs: this.dogBreeds,
        cats: this.catBreeds
      });
    }

    addPet(pet: any): Observable<any> {
      return new Observable(observer => {
        this.petsCollection.add(pet)
          .then(() => observer.next(pet))
          .catch(error => observer.error(error));
      });
    }
  
    getPets(userId: string): Observable<any[]> {
      return this.firestore.collection('Pets', ref => ref.where('userId', '==', userId))
        .snapshotChanges()
        .pipe(
          map(actions =>
            actions.map(a => {
              const data = a.payload.doc.data() as PetData;
              const id = a.payload.doc.id;
              return { id, ...data };
            })
          )
        );
    }

    updatePet(id: string, updatedPet: any): Observable<any> {
      return new Observable(observer => {
        this.petsCollection.doc(id).update(updatedPet)
          .then(() => observer.next(updatedPet))
          .catch(error => observer.error(error));
      });
    }
  
    deletePet(id: string): Observable<any> {
      return new Observable(observer => {
        this.petsCollection.doc(id).delete()
          .then(() => observer.next())
          .catch(error => observer.error(error));
      });
    }
}
