import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import { Auth } from '@angular/fire/auth';

describe('AuthService', () => {
  let service: AuthService;

  // Створення пустого об'єкту
  const authMock = {}; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        // Підміна справжнього Auth на фейковий
        { provide: Auth, useValue: authMock }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});