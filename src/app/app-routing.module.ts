import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  // import { AppRoutingModule } from './app-routing.module';
  {path:'home',component:HomeComponent},
  {path:'user',component:UserComponent},
  {path:'admin',component:AdminComponent},
  {path:'login',component:LoginComponent},
  {path:'registartion',component:RegistrationComponent},
  {path:'forbidden',component:ForbiddenComponent},
   { path: '', redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
