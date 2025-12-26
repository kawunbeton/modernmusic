import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  // Observable, щоб знати статус юзера в реальному часі
  user$: Observable<User | null> = user(this.auth);

  constructor() { }

  // Реєстрація (Email + Password)
  register(email: string, pass: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, pass);
  }

  // Вхід
  login(email: string, pass: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  // Вихід
  logout(): Promise<void> {
    return signOut(this.auth);
  }
}