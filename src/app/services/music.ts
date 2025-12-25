import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, query, where, getDocs, doc, setDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private firestore = inject(Firestore);
  private songsCollection = collection(this.firestore, 'songs');

  // Список пісень для початкового наповнення бази даних
  private mockSongs: Song[] = [
    {
      id: 1,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      genre: 'Pop',
      tags: ['eng', 'synthwave', '80s-vibes'],
      isCover: false,
      imageUrl: '',
      sourceUrl: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ'
    },
    {
      id: 2,
      title: 'Хризантеми',
      artist: 'Анастимоза',
      genre: 'Indie-pop',
      tags: ['ukr', 'sad-girl', 'new-wave'],
      isCover: false,
      imageUrl: '',
      sourceUrl: 'https://www.youtube.com/watch?v=TA_6hxtg99M'
    },
    {
      id: 3,
      title: 'Stefania',
      artist: 'Kalush Orchestra',
      genre: 'Hip-Hop',
      tags: ['ukr', 'eurovision', 'folk-rap'],
      isCover: false,
      imageUrl: '',
      sourceUrl: 'https://www.youtube.com/watch?v=UiEGVYOruLk'
    },
    {
      id: 4,
      title: 'Kasane Teto — Смарагдове небо (DREVO cover)',
      artist: 'eatum-b',
      genre: 'Rock',
      tags: ['ukr', 'synth-v', 'kasane-teto', 'teto'],
      isCover: true,
      imageUrl: '',
      sourceUrl: 'https://www.youtube.com/watch?v=cru3_KeJjM0'
    }
  ];

  constructor() { }

  // Отримання пісень
  async getSongs(): Promise<Song[]> {
    const q = query(this.songsCollection);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => doc.data() as Song);
  }

  // Пошук однієї пісні
  async getSongById(id: number): Promise<Song | undefined> {
    const q = query(this.songsCollection, where('id', '==', id));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return undefined;
    return snapshot.docs[0].data() as Song;
  }

  // Метод завантаження даних
  async uploadMockData() {
    console.log('Починаємо завантаження...');
    
    for (const song of this.mockSongs) {
      // Автоматична генерація картинки з YouTube
      song.imageUrl = this.getYouTubeThumbnail(song.sourceUrl);

      const docRef = doc(this.songsCollection, `song_${song.id}`);
      
      await setDoc(docRef, song);
      console.log(`Оновлено/Додано: ${song.title}`);
    }
    console.log('Всі дані успішно завантажено!');
  }

  // Витягування картинки з посилання на відео
  private getYouTubeThumbnail(url: string): string {
    try {
      const videoId = url.split('v=')[1];
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    } catch (e) {
      return 'https://placehold.co/600x400/8A2BE2/FFFFFF?text=No+Image';
    }
  }
}