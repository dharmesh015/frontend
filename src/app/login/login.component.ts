import { Component } from '@angular/core';
// import { LoginService } from './login.service';
import{LoginService } from '../login.service';
import { UserService } from '../_service/user.service';
import { NgForm } from '@angular/forms';
import { UserAuthServiceService } from '../_service/user-auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
username: '',
password: ''
};

constructor(private loginService: UserService,private Userauthservice:UserAuthServiceService,private router:Router) {}


login(form: NgForm) {
  if (form.invalid) {
    // Mark all fields as touched to show validation messages
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
    return; // Prevent form submission
  }
  if (form.valid) {
    // Populate the user object with form data
    this.loginService.login(form.value.username, form.value.password)
  .subscribe(
    (response) => {
     this.Userauthservice.setRoles(response.user.role);
     this.Userauthservice.setToken(response.jwtToken);

     const role=response.user.role[0];
     if(role === 'Admin'){
      this.router.navigate(['/admin']);
     }else{
      this.router.navigate(['/user']);
     }
    },
    (error:any) => {
      console.error('Login Failed', error);
      // Handle login failure (show error message)
    }
  );

    // Log the user object or send it to a service
    console.log(form.value.username+"/--/"+form.value.password);
  }

}


register(){

}}