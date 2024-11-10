import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoadingService } from '../../services/loadingService/loading.service';
import { SupabaseService } from '../../services/storageS/supabase.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit{
  @Input() control = new FormControl("");
  @Input() onlyView = false;

  protected image = "https://ionicframework.com/docs/img/demos/avatar.svg";
  protected mimeType = "image/jpg";

  constructor(private readonly supaS: SupabaseService, private readonly loadService: LoadingService) { }


  ngOnInit() {
    // Inicializar la imagen si ya hay un valor en el control
    if (this.control.value) {
      this.image = this.control.value;
    }

    // Suscribirse a cambios en el control
    this.control.valueChanges.subscribe(value => {
      if (value && typeof value === 'string') {
        this.image = value;
      }
    });
  }

  public async uploadFoto(event: any) {
    if (this.onlyView) return;
  
    const file = event.target.files[0];
    if (!file) return;
  
    try {
      // await this.loadService.show();
      
      this.previewImage(file);
  
      // // Subir la imagen y obtener la URL
      const uploadData = await this.supaS.uploadFoto(file);
      if (uploadData)  {
        const url = await this.supaS.getFotoUrl(uploadData.path);
        console.log('URL de imagen subida:', url);
        this.control.setValue(url);
      }
      
      // await this.loadService.dismiss();
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      // await this.loadService.dismiss();
    }
  }

  onImageError() {
    console.error('Error loading image:', this.image);
    // Una Img por defecto por si la carga de esta misma no se de
    this.image = "https://ionicframework.com/docs/img/demos/avatar.svg";
  }

  private previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }

}
