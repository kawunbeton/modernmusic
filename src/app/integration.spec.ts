import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongCard } from './components/song-card/song-card';
import { Song } from './models/song';
import { RouterTestingModule } from '@angular/router/testing';

// Створення тимчасового "Батьківського" компоненту
@Component({
  standalone: true,
  imports: [SongCard],
  template: `<app-song-card [song]="testSong"></app-song-card>`
})
class TestHostComponent {
  testSong: Song = {
    id: 999,
    title: 'Integration Song',
    artist: 'Test Artist',
    genre: 'Rock',
    tags: ['test'],
    isCover: false,
    imageUrl: '',
    sourceUrl: ''
  };
}

// Запис тесту на взаємодію
describe('Integration Test: Parent -> SongCard', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges(); // Angular малює компоненти
    hostElement = fixture.nativeElement;
  });

  it('should pass data from Parent to Child and render title', () => {
    // Пошук заголовку всередині картки
    const title = hostElement.querySelector('.card-title');
    
    // Перевірка, чи "Integration Song" (дані батька) з'явилися в картці (дитина)
    expect(title?.textContent).toContain('Integration Song');
  });

  it('should display correct artist from Parent data', () => {
    const artist = hostElement.querySelector('.card-text');
    expect(artist?.textContent).toContain('Test Artist');
  });
});