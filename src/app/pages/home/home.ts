import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongCard } from '../../components/song-card/song-card';
import { Song } from '../../models/song';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SongCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  // Тимчасові дані для розробки інтерфейсу
  songs: Song[] = [
    {
      id: 1,
      title: 'Пісня A',
      artist: 'Автор 1',
      genre: 'Pop',
      tags: ['eng', 'synthwave'],
      isCover: false,
      imageUrl: 'https://exampleUrl',
      sourceUrl: 'https://exampleUrl'
    },
    {
      id: 2,
      title: 'Пісня B',
      artist: 'Автор 2',
      genre: 'Rock',
      tags: ['eng', 'classic'],
      isCover: false,
      imageUrl: 'https://exampleUrl',
      sourceUrl: 'https://exampleUrl'
    },
    {
      id: 3,
      title: 'Пісня C',
      artist: 'Автор 3',
      genre: 'Hip-Hop',
      tags: ['ukr', 'eurovision'],
      isCover: true,
      imageUrl: 'https://exampleUrl',
      sourceUrl: 'https://exampleUrl'
    }
  ];
}