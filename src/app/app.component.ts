import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from './core/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HTTPStatus } from './core/http-interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  httpActivity: boolean;
  title = 'app';
  user: any;
  closeResult: any;
  users: any;
  searchCriteria: any;

  constructor(private cd: ChangeDetectorRef,
    private httpStatus: HTTPStatus,
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router) {
    this.user = userService.getUser();
  }

  ngOnInit() {
    this.users = this.userService.getUserList();
    this.httpStatus.getHttpStatus().subscribe(response => {
      this.httpActivity = response;
      this.cd.detectChanges();
    });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  changeUser(newUser) {
    this.userService.setUser(newUser);
    this.user = newUser;
  }

  search(event) {
    this.router.navigate(['/edit-playlist'], {queryParams: {search: this.searchCriteria}});
  }
}
