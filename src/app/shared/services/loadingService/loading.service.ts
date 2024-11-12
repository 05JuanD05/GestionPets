import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: HTMLIonLoadingElement | null = null;

  constructor(private readonly loadC: LoadingController) { }

  public async show(message: string = 'Loading...') {
    await this.dismiss();

    this.loading = await this.loadC.create({
      message: message,
      spinner: 'bubbles'
    });

    await this.loading.present();
  }

  public async dismiss() {
    if(this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
