import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../_service/user.service';
import { Registrationuser } from '../modul/registrationuser';
// import { Registrationuser } from '../modul/registrationuser';


@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  userData: Registrationuser = new Registrationuser("","","","","","");

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log("invalid")
      // Mark all fields as touched to show validation messages
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return; // Prevent form submission
    }
    
    if (form.valid) {
      // Populate the user object with form data
      this.userData.userName = form.value.username;
      this.userData.userLastName = form.value.Lastname;
      this.userData.userFirstName = form.value.userFirstName;
      this.userData.email = form.value.Email;
      this.userData.mobile = form.value.Mobile;
      console.log("Form Password:", form.value.Password);
      this.userData.userPassword = form.value.Password;
      console.log("User Password:", this.userData.userPassword);
      
      this.userService.register(this.userData).subscribe(
        (response) => {
          console.log("Registration successful!", response);
          
          this.router.navigate(['/login']); // Redirect after success
         
        },
        (error) => {
          console.log("Registration failed", error);
        }
      );
    }


  //   console.log("Username: " + form.value.username);
      
  }
}
