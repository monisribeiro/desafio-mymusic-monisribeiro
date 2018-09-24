import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlaylistComponent } from './edit-playlist.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/user.service';
import { EditPlaylistService } from './services/edit-playlist.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('EditPlaylistComponent', () => {
  let component: EditPlaylistComponent;
  let fixture: ComponentFixture<EditPlaylistComponent>;

  const userServiceSpy = jasmine.createSpyObj('UserService', ['setUser', 'observeUser']);
  let editPlaylistServiceSpy = jasmine.createSpyObj('EditPlaylistService', ['remove', 'add', 'getPlaylistMusics']);

  const musicsArray = {
    'id':'7ff43fef-2d9f-4842-a23a-4be8b35bf422',
    'playlistMusicas':
      [
        {
          'playlistId':'7ff43fef-2d9f-4842-a23a-4be8b35bf422',
          'musicaId':'0952194e-5a3d-4826-ba3e-696e50684a68',
          'musica':
          {
            'selected': false,
            'id':'0952194e-5a3d-4826-ba3e-696e50684a68',
            'nome':'Southern Girls',
            'artistaId':'1eba7dda-8846-4611-a0d2-3d7f2bb0013d',
            'artista':
            {
              'id':'1eba7dda-8846-4611-a0d2-3d7f2bb0013d',
              'nome':'Cheap Trick'
            }
          }
        },{
          'playlistId':'7ff43fef-2d9f-4842-a23a-4be8b35bf422',
          'musicaId':'bc6140e1-5d17-4172-81b4-58dee629637f',
          'musica':
          {
            'selected': false,
            'id':'bc6140e1-5d17-4172-81b4-58dee629637f',
            'nome':'Childhood Sweetheart',
            'artistaId':'d1a992dd-34fd-4415-9fde-e39df325b29e',
            'artista':
            {
              'id':'d1a992dd-34fd-4415-9fde-e39df325b29e',
              'nome':'Chuck Berry'
            }
          }
        }
      ],
      'usuario':
      {
        'id':'91821da8-b8fc-4654-b81c-6b6f5f60cb40',
        'nome':'abdala',
        'playlistId':'7ff43fef-2d9f-4842-a23a-4be8b35bf422'
      }
    };

    const allMusicsArray = [{
      'selected': false,
      'id': 1,
      'nome': 'Let it be',
      'artistaId': '10',
      'artista': {
        'id': '10',
        'nome': 'The Beatles'
      }
    }, {
      'selected': false,
      'id': '2',
      'nome': 'Hey Jude',
      'artistaId': '20',
      'artista': {
        'id': '20',
        'nome': 'The Beatles'
      }
    }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlaylistComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: Observable.of({musics: musicsArray, allMusics: allMusicsArray}),
            queryParams: Observable.of({search: ''})
          }
        },
        UserService,
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        },
        EditPlaylistService
      ]
    })
    .compileComponents();

    editPlaylistServiceSpy = TestBed.get(EditPlaylistService);

  }));

  beforeEach(() => {
    userServiceSpy.observeUser.and.returnValue(Observable.of('abdala'));
    spyOn(editPlaylistServiceSpy, 'getPlaylistMusics').and.returnValue(Observable.of(musicsArray));
    fixture = TestBed.createComponent(EditPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call init', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should select music', () => {
    expect(component).toBeTruthy();
    component.selectMusic(allMusicsArray[0]);
    fixture.detectChanges();
  });


  it('should toggle selected', () => {
    expect(component).toBeTruthy();
    component.toggleChecked();
    fixture.detectChanges();
  });


  it('should call isAllSelected', () => {
    expect(component).toBeTruthy();
    component.isAllSelected();
    fixture.detectChanges();
  });


  it('should remove music', () => {
    expect(component).toBeTruthy();
    spyOn(editPlaylistServiceSpy, 'remove').and.returnValue(Observable.of('OK'));
    component.remove(musicsArray.playlistMusicas[0]);
    fixture.detectChanges();
  });


  it('should add music', () => {
    expect(component).toBeTruthy();
    spyOn(editPlaylistServiceSpy, 'add').and.returnValue(Observable.of('OK'));
    component.addMusic();
    fixture.detectChanges();
  });


  it('should close alert', () => {
    expect(component).toBeTruthy();
    component.closeAlert();
    fixture.detectChanges();
  });


  it('should call limpar busca', () => {
    expect(component).toBeTruthy();
    component.limparBusca();
    fixture.detectChanges();
  });
});
