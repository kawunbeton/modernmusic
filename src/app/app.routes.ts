import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SongDetails } from './pages/song-details/song-details';
import { SongForm } from './pages/song-form/song-form'; // Імпорт

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'song/new', component: SongForm },      // Сторінка створення
  { path: 'song/edit/:id', component: SongForm }, // Сторінка редагування
  { path: 'song/:id', component: SongDetails },
  { path: '**', redirectTo: '' }
];