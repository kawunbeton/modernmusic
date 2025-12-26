import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Для форм
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MusicService } from '../../services/music';
import { Song } from '../../models/song';

@Component({
  selector: 'app-song-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './song-form.html',
  styleUrl: './song-form.scss'
})
export class SongForm implements OnInit {
  songForm: FormGroup;
  isEditMode = false;
  songId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private musicService: MusicService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Ініціалізація форми з валідацією
    this.songForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      artist: ['', Validators.required],
      genre: ['', Validators.required],
      sourceUrl: ['', Validators.required], // Посилання на YouTube
      imageUrl: [''], // Картинка (необов'язково, бо генерується сама)
      description: [''],
      tagsString: [''], // Допоміжне поле для введення тегів через кому
      isCover: [false]
    });
  }

  async ngOnInit() {
    // Перевіряємо, чи є ID в URL (чи це редагування)
    const idString = this.route.snapshot.paramMap.get('id');
    
    if (idString) {
      this.isEditMode = true;
      this.songId = Number(idString);
      
      // Завантажуємо дані пісні
      const song = await this.musicService.getSongById(this.songId);
      if (song) {
        // Заповнюємо форму даними (перетворюємо масив тегів у рядок)
        this.songForm.patchValue({
          ...song,
          tagsString: song.tags ? song.tags.join(', ') : ''
        });
      }
    }
  }

  async onSubmit() {
    if (this.songForm.invalid) return;

    // Отримуємо дані з форми
    const formValue = this.songForm.value;
    
    // Перетворюємо рядок тегів назад у масив
    const tagsArray = formValue.tagsString
      .split(',')
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag.length > 0);

    // Формуємо об'єкт пісні
    const songData: Song = {
      id: this.songId || 0, // ID буде згенеровано в сервісі, якщо це 0
      title: formValue.title,
      artist: formValue.artist,
      genre: formValue.genre,
      sourceUrl: formValue.sourceUrl,
      imageUrl: formValue.imageUrl,
      description: formValue.description,
      isCover: formValue.isCover,
      tags: tagsArray
    };

    try {
      if (this.isEditMode) {
        await this.musicService.updateSong(songData);
      } else {
        await this.musicService.addSong(songData);
      }
      // Після збереження повертаємось на головну
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Помилка збереження:', error);
    }
  }
}