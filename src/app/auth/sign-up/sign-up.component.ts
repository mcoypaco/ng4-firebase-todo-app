import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import * as firebase from 'firebase/app';

import { AuthService } from '../auth.service';
import { ExceptionService } from '../../core/exception.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  email: string;
  busy: boolean;
  emailAlreadyInUse: boolean;
  passwordsMatch: boolean;

  emailForm: FormGroup;
  passwordForm: FormGroup;

  emailSubscription: Subscription;
  passwordSubscription: Subscription;
  confirmPasswordSubscription: Subscription;

  constructor(
    private auth: AuthService, 
    private fb: FormBuilder,
    private exception: ExceptionService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.emailSubscription = this.emailForm.get('email').valueChanges
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(email => {
        if(this.emailForm.valid)
          this.auth.fetchProvidersForEmail(email)
            .then(resp => this.emailAlreadyInUse = resp.length ? true : false)
            .catch(error => console.log(error));
      });

    this.passwordSubscription = this.passwordForm.get('password').valueChanges
      .subscribe(password => this.passwordsMatch = password === this.passwordForm.get('confirmPassword').value);

    this.confirmPasswordSubscription = this.passwordForm.get('confirmPassword').valueChanges
      .subscribe(confirmPassword => this.passwordsMatch = confirmPassword === this.passwordForm.get('password').value);
  }

  ngOnDestroy() {
    this.passwordSubscription.unsubscribe();
    this.confirmPasswordSubscription.unsubscribe();
  }

  emailSubmit() {
    this.email = this.emailForm.get('email').value;
  }

  createUserWithEmailAndPassword() {
    if(this.emailForm.valid && !this.emailAlreadyInUse && this.passwordForm.valid && this.passwordsMatch && !this.busy)
    {
      this.busy = true;

      this.auth.createUserWithEmailAndPassword(this.emailForm.get('email').value, this.passwordForm.get('password').value)
        .then(resp => {
          this.router.navigate(['/']);
          this.busy = false; 
        })
        .catch((error: firebase.FirebaseError) => {
          this.exception.handle(error.code, error.message);
          this.busy = false; 
        });
    }
  }

}
