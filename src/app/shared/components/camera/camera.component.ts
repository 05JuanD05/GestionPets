import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  path: string = 'MascotasFile';

  constructor() {}

  ngOnInit() {
    Camera.requestPermissions();
    this.createDir();
  }

  async Takephoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        saveToGallery: true,
        resultType: CameraResultType.Base64, // Cambiado a Uri para obtener la ruta del archivo
        source: CameraSource.Camera,
      });

      if (image.path) {
        // Guarda en la galería y en el directorio personalizado
        await this.savephotoToGallery(image.path);
        await this.savephotoToDirectory(image.path);
      }
    } catch (error) {
      console.error('Error al tomar o guardar la foto', error);
    }
  }

  async savephotoToGallery(fileUri: string) {
    try {
      // Copia la imagen al almacenamiento externo (galería)
      const fileName = `photo_${new Date().getTime()}.jpg`;
      await Filesystem.copy({
        from: fileUri,
        to: `DCIM/Camera/${fileName}`, // Ruta típica de la galería
        directory: Directory.ExternalStorage,
      });
      console.log('Foto guardada en la galería:', fileName);
    } catch (error) {
      console.error('Error al guardar la foto en la galería:', error);
    }
  }

  async savephotoToDirectory(fileUri: string) {
    try {
      // Lee la foto como base64 para guardarla en el directorio personalizado
      const readFile = await Filesystem.readFile({
        path: fileUri,
      });

      await Filesystem.writeFile({
        path: `${this.path}/photo_${new Date().getTime()}.jpg`,
        data: readFile.data,
        directory: Directory.Documents,
      });
      console.log('Foto guardada en el directorio personalizado');
    } catch (error) {
      console.error('Error al guardar la foto en el directorio personalizado:', error);
    }
  }

  createDir() {
    Filesystem.mkdir({
      path: this.path,
      directory: Directory.Documents,
    })
      .then((res) => {
        console.log('Directorio creado:', res);
      })
      .catch((err) => {
        if (err.message !== 'Directory exists') {
          console.error('Error al crear el directorio:', err);
        }
      });
  }
}