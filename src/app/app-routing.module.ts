import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { 
      path:'',
      loadChildren:'app/todo/todo.module#TodoModule', 
      canLoad:[AuthGuard],
      canActivate:[AuthGuard],
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }