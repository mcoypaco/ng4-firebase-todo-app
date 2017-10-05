import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { EmailComponent } from './email/email.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RedirectIfLoggedInGuard } from './redirect-if-logged-in.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectIfLoggedInGuard]
  },
  {
    path: 'password-reset',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: PasswordResetComponent
      }
    ],
    canActivate: [RedirectIfLoggedInGuard]
  },
  {
    path: 'sign-in',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: EmailComponent
      }
    ],
    canActivate: [RedirectIfLoggedInGuard]
  },
  {
    path: 'sign-up',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: SignUpComponent
      }
    ],
    canActivate: [RedirectIfLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
