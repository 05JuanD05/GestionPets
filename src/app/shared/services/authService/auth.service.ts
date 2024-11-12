import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly petAuth: AngularFireAuth) { }

  public registrarUser(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.petAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  public login(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.petAuth.signInWithEmailAndPassword(email, password)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    })
  }
}
