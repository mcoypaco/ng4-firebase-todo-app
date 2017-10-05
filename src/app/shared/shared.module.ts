import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InputErrorComponent } from './input-error/input-error.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    InputErrorComponent
  ],
  declarations: [InputErrorComponent]
})
export class SharedModule { }
