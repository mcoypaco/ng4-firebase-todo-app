import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';
import * as firebase from 'firebase/app';

import { AuthService } from './auth.service';
import { ExceptionService } from '../core/exception.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private auth: AuthService, 
    private exception: ExceptionService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    return this.isLoggedIn(url);
  }

  canLoad(route: Route) {
    return this.isLoggedIn(`/${route.path}`); 
  }

  isLoggedIn(url: string): Observable<boolean> {
    return this.auth.authState()
      .map(user => {
        if(user) {
          this.auth.user = user;
          return true;
        };
        
        this.auth.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
      })
      .catch((error: firebase.FirebaseError) => { 
        this.exception.handle(error.code, error.message);
        return Observable.of(false); 
      })
      .first();
  }
}
