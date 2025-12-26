import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongCard } from '../../components/song-card/song-card';
import { Song } from '../../models/song';
import { MusicService } from '../../services/music';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SongCard, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home implements OnInit {
  allSongs: Song[] = [];
  filteredSongs: Song[] = [];
  
  // Додавання масиву для списку жанрів
  genres: string[] = []; 

  searchTerm: string = '';
  selectedGenre: string = '';

  constructor(
    private musicService: MusicService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    // Розкоментуйте рядок нижче, щоб завантажити тестові дані в пусту базу:
    // await this.musicService.uploadMockData(); 

    try {
      this.allSongs = await this.musicService.getSongs();
      this.allSongs.sort((a, b) => a.id - b.id);
      
      // Витягування унікальних жанрів з існуючих карток
      const uniqueGenres = new Set(this.allSongs.map(s => s.genre));
      this.genres = Array.from(uniqueGenres).sort();

      this.filteredSongs = this.allSongs;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Помилка отримання пісень:', error);
    }
  }

  // Метод фільтрації
  filterSongs() {
    const term = this.searchTerm.toLowerCase().trim();

    this.filteredSongs = this.allSongs.filter(song => {
      const matchesGenre = this.selectedGenre ? song.genre === this.selectedGenre : true;
      
      const matchesSearch = 
        song.title.toLowerCase().includes(term) || 
        song.artist.toLowerCase().includes(term) ||
        (song.tags && song.tags.some(tag => tag.toLowerCase().includes(term)));

      return matchesGenre && matchesSearch;
    });
  }
}