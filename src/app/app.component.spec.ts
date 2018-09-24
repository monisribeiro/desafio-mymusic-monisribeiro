import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HTTPStatus } from './core/http-interceptor.service';
import { UserService } from './core/user.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
describe('AppComponent', () => {
  const httpStatusSpy = jasmine.createSpyObj('HTTPStatus', ['getHttpStatus']);
  const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserList', 'setUser']);
  const modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterModule.forRoot([]),
        NgbModule.forRoot()
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        HTTPStatus,
        UserService,
        NgbModal,
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should call init', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

    userServiceSpy.getUserList.and.returnValue([]);
    httpStatusSpy.getHttpStatus.and.returnValue(Observable.of(true));

    app.ngOnInit();
    fixture.detectChanges();

  }));

  it('should call change user', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

    app.changeUser('ana');
    fixture.detectChanges();
    expect(app.user).toEqual('ana');
  }));

  it('should call search', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

    app.search('ana');
    fixture.detectChanges();
  }));
});
