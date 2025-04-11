import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './_auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
// import { ProductDisplayComponent } from './product-display-component/product-display-component.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { ProductDetailDialogComponent } from './product-detail-dialog/product-detail-dialog.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SellerComponent } from './seller/seller.component';
import { CartComponent } from './cart/cart.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ShowOrderComponent } from './show-order/show-order.component';

const routes: Routes = [
  // import { AppRoutingModule } from './app-routing.module';
  { path: 'home', component: HomeComponent },
 
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'seller',
    component: SellerComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Seller'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'forbidden', component: ForbiddenComponent },

  {
    path: 'Showproduct',
    component: ProductListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Seller'] },
  },
  {
    path: 'AddNewProduct',
    component: AddNewProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Seller'] },
  },
  { path: 'Profilepage', component: ProfilepageComponent },
  { path: 'productlist', component: ProductDetailDialogComponent },
  { path: 'editproduct/:id', component: EditproductComponent },
  {
    path: 'showcart',
    component: CartComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'ProductViewDetails/:id', component: ProductViewDetailsComponent },

  { path: 'forgot-password', component: ForgotPasswordComponent },

  {
    path: 'buyProduct',
    component: BuyProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
  {
    path: 'showorder',
    component: ShowOrderComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Seller'] },
  },
  {path:'homepage',component:HomepageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ForbiddenComponent },
];

@NgModule({
  // exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollOffset: [0, 50],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
