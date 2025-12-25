import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Song } from '../../models/song';

@Component({
  selector: 'app-song-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './song-card.html',
  styleUrl: './song-card.scss'
})
export class SongCard {
  @Input() song!: Song;
  
  // Обробник помилок завантаження зображення
  onImageError(event: any) {
    event.target.src = 'https://placehold.co/600x400/8A2BE2/FFFFFF?text=No+Image';
  }
}