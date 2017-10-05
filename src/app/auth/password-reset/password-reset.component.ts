import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { AuthService } from '../auth.service';
import { ExceptionService } from '../../core/exception.service';
import { NotificationService } from '../../core/notification.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  email: FormControl;

  constructor(
    private auth: AuthService, 
    private exception: ExceptionService,
    private notification: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
  }

  sendPasswordResetEmail() {
    if(this.email.valid)
      this.auth.sendPasswordResetEmail(this.email.value)
      .then(() => {
        this.notification.simple('Password reset link has been sent to your email.');
        this.router.navigate(['/']);
      })
      .catch((error: firebase.FirebaseError) => this.exception.handle(error.code, error.message));
  }
}
