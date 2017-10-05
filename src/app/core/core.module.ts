import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDialogModule, MatSnackBarModule } from '@angular/material';

import { environment } from '../../environments/environment';
import { ExceptionComponent } from './exception/exception.component';
import { ExceptionService } from './exception.service';
import { SharedModule } from '../shared/shared.module';
import { NotificationService } from './notification.service';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    SharedModule
  ],
  declarations: [ExceptionComponent],
  providers: [ExceptionService, NotificationService],
  entryComponents: [ExceptionComponent]
})
export class CoreModule { }
