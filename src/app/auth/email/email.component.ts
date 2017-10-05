import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { AuthService } from '../auth.service';
import { ExceptionService } from '../../core/exception.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  form: FormGroup;

  constructor(
    private auth: AuthService,
    private exception: ExceptionService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  signInWithEmailAndPassword() {
    if(this.form.valid)
      this.auth.signInWithEmailAndPassword(this.form.get('email').value, this.form.get('password').value)
        .then(resp => this.router.navigate(['/']))
        .catch((error: firebase.FirebaseError) => this.exception.handle(error.code, error.message));
  }

}
