import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { MatSelectModule } from '@angular/material/select';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import{FormsModule} from '@angular/forms'
import { MatTableModule } from '@angular/material/table';

import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { FooterComponent } from './footer/footer.component';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_service/user.service';
import { AuthGuard } from './_auth/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { DragDirective } from './drag.directive';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
// import { ProductDisplayComponent } from './product-display-component/product-display-component.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailDialogComponent } from './product-detail-dialog/product-detail-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SellerComponent } from './seller/seller.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { ChangeRoleDialogComponent } from './change-role-dialog/change-role-dialog.component';
import { from } from 'rxjs';
import { ShowOrderComponent } from './show-order/show-order.component';
import { MatPaginatorModule } from '@angular/material/paginator';




@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,

    HomeComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    RegistrationComponent,
    FooterComponent,
    AddNewProductComponent,
    ProductListComponent,
    ProductDetailDialogComponent,
    ProductViewDetailsComponent,
    BuyProductComponent,
    EditproductComponent,
    ProfilepageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SellerComponent,
    AddUserDialogComponent,
    UpdateUserDialogComponent,
    HomepageComponent,
    ChangeRoleDialogComponent,
    ShowOrderComponent
    
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  
    MatButtonModule,          
    MatToolbarModule   ,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    DragDirective,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
 
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }