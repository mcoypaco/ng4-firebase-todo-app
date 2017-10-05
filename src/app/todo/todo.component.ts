import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { AuthService } from '../auth/auth.service';
import { ExceptionService } from '../core/exception.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(
    public auth: AuthService, 
    private exception: ExceptionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signOut(): void {
    this.auth.logout()
      .then(() => this.router.navigate(['/login']))
      .catch((error: firebase.FirebaseError) => this.exception.handle(error.code, error.message));
  }
}
