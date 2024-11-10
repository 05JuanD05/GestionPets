// src/app/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabaseUrl = 'https://cikaputxrspfyugyfmmx.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpa2FwdXR4cnNwZnl1Z3lmbW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNzM0NzYsImV4cCI6MjA0Njc0OTQ3Nn0.WZWGluFyG91O-LILCmeFuLW0CfxK9B2sRkIgE4kIcCs';
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async uploadFoto(file: File): Promise<any> {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await this.supabase.storage
    .from('photosUsers')
    .upload(`fotos/${fileName}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      console.error('Error al subir la foto: ', error.message);
      return null;
    } else {
      console.log('Foto subida con exito: ', data);
      return data;
    }
  }

  //Funcion para la URL
  async getFotoUrl(fileName: string): Promise<string | null> {
    const { data, error } = await this.supabase.storage
    .from('photosUsers')
    .createSignedUrl(`fotos/${fileName}`, 60);

    if (error) {
      console.error('Error al obtener la URL de la foto: ', error.message);
      return null;
    } else {
      return data.signedUrl;
    }
  }
  
}
