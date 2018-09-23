import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppInitializerService {

  constructor(private userService: UserService,
              private httpClient: HttpClient) { }

  public init() {
    return this.httpClient.get('./assets/data/usuarios.json').toPromise().then((response: Array<any>) => {
      const list = response.sort();
      this.userService.setUser(list[0]);
      this.userService.setUserList(list);
    });
  }

}

export function appInitializerServiceFactory(appInitializerService: AppInitializerService): Function {
  return () => appInitializerService.init();
}
