import { Injectable } from '@angular/core'; 
import { Toast } from '@capacitor/toast'
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  constructor (){}

  async show(message: string, duration: 'short' | 'long' = 'short', position: 'top' | 'center' | 'bottom' = 'bottom'){
    try {
      await Toast.show({
       text: message, 
       duration, 
       position,
      })
    } catch (error) {
      console.error('Error al mostrar el toast' , error); 
    }
  }
}
