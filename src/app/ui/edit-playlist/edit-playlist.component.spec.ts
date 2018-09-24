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
  const router =  { navigate: jasmine.createSpy('navigate')};

  const musicsArray = {
    'id':'7ff43fef-2d9f-4842-a23a-4be8b35bf422',
    'playlistMusicas':
      [
        {
          'playlistId': '7ff43fef-2d9f-4842-a23a-4be8b35bf422',
          'musicaId': '0952194e-5a3d-4826-ba3e-696e50684a68',
          'musica':
          {
            'selected': false,
            'id': '0952194e-5a3d-4826-ba3e-696e50684a68',
            'nome': 'Southern Girls',
            'artistaId': '1eba7dda-8846-4611-a0d2-3d7f2bb0013d',
            'artista':
            {
              'id': '1eba7dda-8846-4611-a0d2-3d7f2bb0013d',
              'nome': 'Cheap Trick'
            }
          }
        }, {
          'playlistId': '7ff43fef-2d9f-4842-a23a-4be8b35bf422',
          'musicaId': 'bc6140e1-5d17-4172-81b4-58dee629637f',
          'musica':
          {
            'selected': false,
            'id': 'bc6140e1-5d17-4172-81b4-58dee629637f',
            'nome': 'Childhood Sweetheart',
            'artistaId': 'd1a992dd-34fd-4415-9fde-e39df325b29e',
            'artista':
            {
              'id': 'd1a992dd-34fd-4415-9fde-e39df325b29e',
              'nome': 'Chuck Berry'
            }
          }
        }
      ],
      'usuario':
      {
        'id': '91821da8-b8fc-4654-b81c-6b6f5f60cb40',
        'nome': 'abdala',
        'playlistId': '7ff43fef-2d9f-4842-a23a-4be8b35bf422'
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
            queryParams: Observable.of({search: 'Beatles'})
          }
        },
        UserService,
        {
          provide: Router,
          useValue: router
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
    const title = document.getElementById('all-musics-title');
    expect(title.innerText).toEqual('Todas as músicas: Beatles');

    const emptyAllMusicsText = document.getElementById('all-musics-empty-text');
    expect(emptyAllMusicsText).toBeNull();

    const emptyMusicsText = document.getElementById('musics-empty-text');
    expect(emptyMusicsText).toBeNull();

    const allMusicsTable = document.getElementById('all-musics-table');
    expect(allMusicsTable).toBeDefined();

    const musicsTable = document.getElementById('musics-table');
    expect(musicsTable).toBeDefined();
  });

  it('should select music', () => {
    expect(component).toBeTruthy();
    component.selectMusic(allMusicsArray[0]);
    fixture.detectChanges();
    expect(allMusicsArray[0].selected).toBeTruthy();

    component.selectMusic(allMusicsArray[1]);
    fixture.detectChanges();
    expect(allMusicsArray[1].selected).toBeTruthy();

    const checkbox = document.getElementById('all-checked') as HTMLInputElement;
    expect(checkbox.checked).toBeTruthy();

  });


  it('should toggle selected', () => {
    expect(component).toBeTruthy();
    component.toggleChecked();
    fixture.detectChanges();
    const list = component.allMusics;
    const selected = list.filter(music => music.selected);
    expect(selected.length).toEqual(allMusicsArray.length);
  });


  it('should call isAllSelected', () => {
    expect(component).toBeTruthy();
    component.toggleChecked();
    component.isAllSelected();
    fixture.detectChanges();
    expect(component.allSelected).toBeTruthy();
    component.toggleChecked();
    component.isAllSelected();
    fixture.detectChanges();
    expect(component.allSelected).toBeFalsy();
  });


  it('should remove music', () => {
    expect(component).toBeTruthy();
    spyOn(editPlaylistServiceSpy, 'remove').and.returnValue(Observable.of('OK'));

    const initialLength = component.musics.length;

    component.remove(musicsArray.playlistMusicas[0]);

    fixture.detectChanges();
    const finalLength = component.musics.length;
    expect(finalLength + 1).toEqual(initialLength);

    const alert = document.getElementById('alert');
    expect(alert).toBeDefined();
    expect(alert).not.toBeNull();
    expect(alert.innerText).toBe('Música removida com sucesso');
    expect(alert.parentElement.className).toContain('alert-success');
  });


  it('should add music', () => {
    expect(component).toBeTruthy();

    spyOn(editPlaylistServiceSpy, 'add').and.returnValue(Observable.of('OK'));

    const initialLength = component.musics.length;
    component.toggleChecked();
    fixture.detectChanges();

    component.addMusic();
    fixture.detectChanges();

    const finalLength = component.musics.length;
    expect(finalLength - component.allMusics.length).toEqual(initialLength);

    const alert = document.getElementById('alert');
    expect(alert).toBeDefined();
    expect(alert).not.toBeNull();
    expect(alert.innerText).toBe('Músicas adicionadas com sucesso');
    expect(alert.parentElement.className).toContain('alert-success');
  });


  it('should close alert', () => {
    expect(component).toBeTruthy();
    spyOn(component, 'closeAlert');
    spyOn(editPlaylistServiceSpy, 'remove').and.returnValue(Observable.of('OK'));

    component.remove(musicsArray.playlistMusicas[0]);
    fixture.detectChanges();

    const alert = document.getElementById('alert');
    expect(alert).toBeDefined();
    expect(alert).not.toBeNull();
    const alertBt = document.getElementById('alert-bt');
    expect(alertBt).not.toBeNull();
    alertBt.click();
    expect(component.closeAlert).toHaveBeenCalled();
  });


  it('should call limpar busca', () => {
    expect(component).toBeTruthy();
    spyOn(component, 'limparBusca');
    document.getElementById('limpar-busca-bt').click();
    fixture.detectChanges();
    expect(component.limparBusca).toHaveBeenCalled();
  });
});
