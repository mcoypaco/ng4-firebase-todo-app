import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {

  constructor(private snackBar: MdSnackBar) { }

  simple(message: string, dismiss: string = 'Got it!') {
    return this.snackBar.open(message, dismiss, {
      duration: 3000
    });
  }
}
