import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';
import * as firebase from 'firebase/app';

import { AuthService } from './auth.service';
import { ExceptionService } from '../core/exception.service';

@Injectable()
export class RedirectIfLoggedInGuard implements CanActivate {
  constructor(
    private auth: AuthService, 
    private exception: ExceptionService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isLoggedIn();
  }

  isLoggedIn(): Observable<boolean> {
    return this.auth.authState()
    .map(resp => {
      if(resp) {
        this.router.navigate(['/']);
        return false;  
      }
      
      return true;
    })
    .catch((error: firebase.FirebaseError) => {
      this.exception.handle(error.code, error.message);
      return Observable.of(false);
    })
    .first();
  }
}
