import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetSService {
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


    getBreeds(): Observable<{ dogs: { label: string, value: string }[], cats: { label: string, value: string }[] }> {
      return of({
        dogs: this.dogBreeds,
        cats: this.catBreeds
      });
    }
}
