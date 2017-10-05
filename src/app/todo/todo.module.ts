import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';

@NgModule({
  imports: [
    MatButtonModule,
    SharedModule,
    TodoRoutingModule
  ],
  declarations: [TodoComponent]
})
export class TodoModule { }
