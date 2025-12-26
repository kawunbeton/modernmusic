import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongCard } from './song-card';
import { RouterTestingModule } from '@angular/router/testing';

describe('SongCard', () => {
  let component: SongCard;
  let fixture: ComponentFixture<SongCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongCard, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SongCard);
    component = fixture.componentInstance;

    // Вручну передано дані в Input
    component.song = {
      id: 1,
      title: 'Test Song',
      artist: 'Test Artist',
      genre: 'Rock',
      tags: ['test'],
      isCover: false,
      imageUrl: '',
      sourceUrl: ''
    };

    fixture.detectChanges(); // Тепер запускається рендер
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display song title', () => {
    // Перевірка, чи намалювався заголовок у HTML
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-title')?.textContent).toContain('Test Song');
  });
});