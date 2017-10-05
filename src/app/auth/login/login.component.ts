import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { AuthService } from '../auth.service';
import { ExceptionService } from '../../core/exception.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    public auth: AuthService, 
    private exception: ExceptionService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', []],
    });
  }

  signInWithGoogle() {
    this.auth.signInWithGoogle()
      .then(resp => {
        this.auth.googleToken = resp.token;
        this.auth.user = resp.user;
        this.router.navigate([this.auth.redirectUrl]);
      })
  }
}
