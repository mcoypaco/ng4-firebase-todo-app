import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatStepperModule } from '@angular/material';
import { RedirectIfLoggedInGuard } from './redirect-if-logged-in.guard';
import { SharedModule } from '../shared/shared.module';
import { EmailComponent } from './email/email.component';
import { AuthComponent } from './auth.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
  imports: [
    SharedModule,
    AngularFireAuthModule,
    AuthRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent, EmailComponent, AuthComponent, SignUpComponent, PasswordResetComponent],
  providers: [AuthGuard, AuthService, RedirectIfLoggedInGuard]
})
export class AuthModule { }
