import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/authService/auth.service';
import { NavController } from '@ionic/angular';
import { LoadingService } from '../shared/services/loadingService/loading.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
public email!: FormControl;
public password!: FormControl;
public loginform!: FormGroup;


  constructor( private readonly  authSrv: AuthService, private readonly navCtrl:
     NavController,private readonly loadingSrv: LoadingService ) {
    this.initForm();
   }
  
  ngOnInit() {
  }

  public async dologin(){
    try{
      console.log(this.loginform.value);
       await this.loadingSrv.show();
      const {email,password} = this.loginform.value;
      await this.authSrv.login(email,password);
      this.navCtrl.navigateForward("home");
       await this.loadingSrv.dismiss();
    }catch (error) {
      console.error(error);
       await this.loadingSrv.dismiss();
    }
  }

  private initForm() {
    this.email = new FormControl("",[Validators.required,
    Validators.email]);
    this.password = new FormControl("",[Validators.required]);
    this.loginform = new FormGroup({
     email: this.email,
     password: this.password
    })
  }

}