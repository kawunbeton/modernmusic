import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MusicService } from '../../services/music';
import { Song } from '../../models/song';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-song-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './song-details.html',
  styleUrl: './song-details.scss'
})
export class SongDetails implements OnInit {
  song: Song | undefined;
  safeVideoUrl: SafeResourceUrl | undefined;

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    public authService: AuthService // Додано authService
  ) {}

  async ngOnInit() {
    const idString = this.route.snapshot.paramMap.get('id');
    
    if (idString) {
      const id = Number(idString);

      this.song = await this.musicService.getSongById(id);
        
      if (this.song && this.song.sourceUrl) {
        this.safeVideoUrl = this.getSafeUrl(this.song.sourceUrl);
      }

      // Примусове оновлення екрану
      this.cdr.detectChanges();
    }
  }

  private getSafeUrl(url: string): SafeResourceUrl {
    // Проста перевірка, щоб не ламалося на неправильних посиланнях
    try {
      const videoId = url.split('v=')[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    } catch {
      return '';
    }
  }
}