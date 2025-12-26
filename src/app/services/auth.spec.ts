import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import { Auth } from '@angular/fire/auth'; // Правильний імпорт з бібліотеки

describe('AuthService', () => {
  let service: AuthService;

  // Створюємо пустий об'єкт, щоб обдурити тест (нам не треба справжній Firebase тут)
  const authMock = {}; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        // Підміняємо справжній Auth на наш фейковий
        { provide: Auth, useValue: authMock }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});