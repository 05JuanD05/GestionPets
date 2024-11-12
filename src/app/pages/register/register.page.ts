import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/authService/auth.service';
import { LoadingService } from 'src/app/shared/services/loadingService/loading.service';
import { RegisterServiceService } from 'src/app/shared/services/registerS/register-service.service';
import { SupabaseService } from 'src/app/shared/services/storageS/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public image!: FormControl;
  public name!: FormControl;
  public lastName!: FormControl;
  public age!: FormControl;
  public email!: FormControl;
  public phone!: FormControl;
  public password!: FormControl;
  public registerForm!: FormGroup;
  public id: string = "";
  public passwordType: 'text' | 'password' = 'password';


  constructor(private readonly authSv: AuthService, private readonly loadingSv: LoadingService, private readonly navControl: NavController, private readonly route: ActivatedRoute, private readonly registerUser: RegisterServiceService, private readonly supabaseS: SupabaseService) { 
    this.initForm();
  }

  ngOnInit() {
  }

  public async doRegister() {
    try{
      await this.loadingSv.show();
      console.log(this.registerForm.value);
      const { email, password, image, name, lastName, age, phone } = this.registerForm.value;
      const userCreden: any = await this.authSv.registrarUser(email, password);
      const userId = userCreden.user?.uid;

      if (!userId) {
        throw new Error('Error al obtener el ID del user.');
      }

      let imageUrl = "";
      if(image) {
        imageUrl = await this.supabaseS.uploadFoto(image);
      }else {
        console.warn('Imagen no seleccionada');
      }

      await this.registerUser.registerUsuarios(userId, email, imageUrl, {name, lastName, age, phone});;

      this.navControl.navigateForward("/login");
    }catch (error) {
      await this.loadingSv.dismiss();

      if(error instanceof Error) {
        if (error.message.includes('Email already in use')) {
          // this.toastMsj.mensajeToast('El correo esta en uso.' , 'danger');
        } else {
          // this.toastMsj.mensajeToast('Error al Registrarse: ' + error.message, 'danger');
        }
        console.error('Error al registrar: ', error);
      }
    }
  }

  private initForm() {
    this.image = new FormControl("");
    this.name = new FormControl("", [Validators.required]);
    this.lastName = new FormControl("", [Validators.required]);
    this.age = new FormControl("", [Validators.required]);
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.phone = new FormControl("", [Validators.required]);
    this.password = new FormControl("", [Validators.required]);
    this.registerForm = new FormGroup({
      image: this.image,
      name: this.name,
      age: this.age,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      password: this.password
    });
  }

}
