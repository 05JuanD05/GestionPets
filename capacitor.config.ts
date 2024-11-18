import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'GestionPets',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    Camera: {
      allowEditing: false,
      resultType: 'DataUrl',
      saveToGallery: true
    }
  }
};

export default config;
