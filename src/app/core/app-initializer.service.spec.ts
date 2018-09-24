import { TestBed, inject } from '@angular/core/testing';

import { AppInitializerService } from './app-initializer.service';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppInitializerService', () => {
  const userServiceSpy = jasmine.createSpyObj('UserService', ['setUserList', 'setUser']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AppInitializerService, UserService]
    });
  });

  it('should be created', inject([AppInitializerService], (service: AppInitializerService) => {
    expect(service).toBeTruthy();
  }));
});
