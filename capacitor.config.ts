import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nijo.app',
  appName: 'Nijo',
  webDir: 'public',
  server: {
    url: 'https://nijo-master-app.vercel.app',
    cleartext: true
  }
};

export default config;
