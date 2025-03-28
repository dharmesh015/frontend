import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './_auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ProductDisplayComponent } from './product-display-component/product-display-component.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  // import { AppRoutingModule } from './app-routing.module';
  {path:'home',component:HomeComponent},
  {path:'user',component:UserComponent, canActivate:[AuthGuard], data:{roles:['User']}},
  {path:'admin',component:AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
  {path:'login',component:LoginComponent},
  {path:'registartion',component:RegistrationComponent},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'Showproduct',component:ProductListComponent},
  {path:"AddNewProduct",component:AddNewProductComponent,canActivate:[AuthGuard], data:{roles:['Admin']}},
  {path:'**',component:ForbiddenComponent},
   { path: '', redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
