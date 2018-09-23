import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  constructor() {
    this.userObservable = new BehaviorSubject('');
   }

  private user;

  private userList;

  public userObservable: BehaviorSubject<any>;

  observeUser() {
    return this.userObservable.asObservable();
  }

  setUser(user) {
    this.user = user;
    this.userObservable.next(user);
  }

  getUser() {
    return this.user;
  }

  setUserList(list) {
    this.userList = list;
  }

  getUserList() {
    return this.userList;
  }

}
