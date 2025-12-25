import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongCard } from '../../components/song-card/song-card';
import { Song } from '../../models/song';
import { MusicService } from '../../services/music';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SongCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  songs: Song[] = [];

  constructor(
    private musicService: MusicService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      this.songs = await this.musicService.getSongs();
      
      // Сортування даних
      this.songs.sort((a, b) => a.id - b.id);
      
      console.log('Пісні отримано:', this.songs);

      // Примусове оновлення екрану
      this.cdr.detectChanges();
      
    } catch (error) {
      console.error('Помилка отримання пісень:', error);
    }
  }
}