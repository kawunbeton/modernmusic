import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ 
      projectId: "modernmusic-app", 
      appId: "1:779408045610:web:1fe3ad72c6427f347cb553", 
      storageBucket: "modernmusic-app.firebasestorage.app", 
      apiKey: "AIzaSyBqwPPo_oj1lXqSwDuussXqajZuLGKWbMI", 
      authDomain: "modernmusic-app.firebaseapp.com", 
      messagingSenderId: "779408045610"})),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore())
  ]
};
