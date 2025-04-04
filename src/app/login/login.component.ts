import { Component } from '@angular/core';
// import { LoginService } from './login.service';
import { LoginService } from '../login.service';
import { UserService } from '../_service/user.service';
import { NgForm } from '@angular/forms';
import { UserAuthServiceService } from '../_service/user-auth-service.service';
import { Router } from '@angular/router';
import { Requestuser } from '../modul/requestuser';
import Swal from 'sweetalert2';
// import { Requestuser } from '../modul/requestuser';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private loginService: UserService,
    private userAuthService: UserAuthServiceService,
    private router: Router
  ) {}

  userdata: Requestuser = new Requestuser('', '');
  login(form: NgForm) {
    if (form.invalid) {
      // Mark all fields as touched to show validation messages
      Object.keys(form.controls).forEach((field) => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return; // Prevent form submission
    }
    if (form.valid) {
      // Populate the user object with form dat
      this.userdata.userName = form.value.username;
      this.userdata.userPassword = form.value.password;

      this.loginService.login(this.userdata).subscribe(
        (response: any) => {
          this.userAuthService.setRoles(response.user.role);
          this.userAuthService.setToken(response.jwtToken);
          this.userAuthService.setEmail(response.user.email);
          this.userAuthService.setName(response.user.name);
          this.userAuthService.setUser(response.user);
          console.log("saved data-->",this.userAuthService.getUser());
          // this.userAuthService.setAuthData(response.jwtToken,response.user.role);
          console.log('respose' + response);
          const role = response.user.role[0].roleName;
          if (role === 'Admin') {
            this.router.navigate(['/admin']);
          }else if(role === 'Seller'){
            this.router.navigate(['/seller']);
          }else{
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          Swal.fire({
            title: 'Invalid Credentials',
            text: 'The username or password you entered is incorrect. Please try again.',
            icon: 'error', // Change the icon to 'error' to indicate a problem
            confirmButtonText: 'OK', // Customize the button text
          });
        }
      );

      // Log the user object or send it to a service
      console.log(form.value.username + '/--/' + form.value.password);
    }
  }

  register() {}

  isloggin() {
    return !this.userAuthService.isLoggedIn();
  }
}
