import { authGuard } from './guards/auth.guard'; // Імпорт гварда
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SongDetails } from './pages/song-details/song-details';
import { SongForm } from './pages/song-form/song-form';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  
  // Захищені маршрути
  { 
    path: 'song/new', 
    component: SongForm, 
    canActivate: [authGuard]
  },
  { 
    path: 'song/edit/:id', 
    component: SongForm, 
    canActivate: [authGuard]
  },
  
  { path: 'song/:id', component: SongDetails },
  { path: '**', redirectTo: '' }
];