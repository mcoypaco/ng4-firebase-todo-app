import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { ExceptionComponent } from './exception/exception.component';
import * as firebase from 'firebase/app';

@Injectable()
export class ExceptionService {
  buttonLabel: string = 'Got it!';
  message: string;
  statusText: string;

  constructor(private dialog: MdDialog, private router: Router, private auth: AuthService) { }

  handle(statusText:string, message:string) : void {
    this.statusText = statusText;
    this.message = message;

    switch (statusText) {
      case '401':
        return this.unauthenticated();
    
      case '403':
        return this.unauthorized();

      case '422':
        return this.unprocessable();

      case '500':
        return this.internalServerError();

      default:
        return this.defaultError();
    }
  }
  
  defaultError() {
    this.openDialog();
  }

  unauthenticated() {
    this.message = 'Please login to continue.';
    this.openDialog().afterClosed().subscribe(result => {
      this.auth.logout()
      .then(() => this.router.navigate(['/']))
      .catch((error: firebase.FirebaseError) => this.handle(error.code, error.message))
    });
  }

  unauthorized() {
    this.message = 'This action is unauthorized.';
    this.openDialog();
  }

  unprocessable() {
    this.message = 'Please check the form for errors.';
    this.openDialog();
  }

  internalServerError() { 
    this.message = 'Oops! Something went wrong. Please try again or refresh the page.';
    this.openDialog().afterClosed();
  }

  openDialog() : MdDialogRef<ExceptionComponent> {
    return this.dialog.open(ExceptionComponent, {
      width: '600px',
      data: {
        statusText: this.statusText,
        message: this.message,
        buttonLabel: this.buttonLabel,
      }
    });
  }
}
