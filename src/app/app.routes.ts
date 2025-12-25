import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SongDetails } from './pages/song-details/song-details'; // Імпорт компонента деталей

export const routes: Routes = [
  { path: '', component: Home },                // Маршрут для головної сторінки
  { path: 'song/:id', component: SongDetails }, // Маршрут для сторінки деталей з динамічним ID
  { path: '**', redirectTo: '' }                // Перенаправлення на головну, якщо маршрут не знайдено
];