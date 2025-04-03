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
// import { ProductDisplayComponent } from './product-display-component/product-display-component.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { ProductResolveServiceService } from './_service/product-resolve-service.service';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { ProductDetailDialogComponent } from './product-detail-dialog/product-detail-dialog.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { AboutComponent } from './about/about.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  // import { AppRoutingModule } from './app-routing.module';
  { path: 'home', component: HomeComponent },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'registartion', component: RegistrationComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  // { path: 'About', component: AboutComponent },
  {
    path: 'Showproduct',
    component: ProductListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'AddNewProduct',
    component: AddNewProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {path:"Profilepage",component:ProfilepageComponent},
  {path:'productlist',component:ProductDetailDialogComponent},
  {path:'editproduct/:id', component:EditproductComponent},
  // {path:'resetpassword',component:ResetPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'ProductViewDetails/:id', component: ProductViewDetailsComponent },
  {path:'forgot-password',component:ForgotPasswordComponent},
  { path: 'buyProduct/:issingleProducrCheckout/:productId', component: BuyProductComponent,canActivate: [AuthGuard],
    data: { roles: ['User'] }},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ForbiddenComponent }

  // {path:'buyProduct/:issingleProducrCheckout/:productId',component:BuyProductComponent},
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  // exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      onSameUrlNavigation: "reload",
      scrollOffset: [0, 50],
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
