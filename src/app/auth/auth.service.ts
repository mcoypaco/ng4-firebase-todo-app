import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  user: firebase.User;
  redirectUrl: string = '/';
  googleToken: string;
  googleAuthProvider: firebase.auth.GoogleAuthProvider;

  constructor(private afAuth: AngularFireAuth) { 
    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  }

  authState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  createUserWithEmailAndPassword(email: string, password: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  fetchProvidersForEmail(email: string) {
    return this.afAuth.auth.fetchProvidersForEmail(email);
  }

  logout(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

  sendPasswordResetEmail(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return this.afAuth.auth.signInWithPopup(this.googleAuthProvider);
  }
}
