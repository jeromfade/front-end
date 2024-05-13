import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import {roleGuard,userGuard,authGuard}from './auth-role-guard/auth-role.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: 'admin', component: AdminComponent, canActivate: [authGuard,roleGuard] },
{ path: 'user', component: UserComponent, canActivate: [authGuard,userGuard] },
{ path: 'login', component: LoginComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

