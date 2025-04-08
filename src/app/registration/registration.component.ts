import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../_service/user.service';
import { Registrationuser } from '../modul/registrationuser';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  userData: Registrationuser = new Registrationuser('', '', '', '', '', '', '');

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach((field) => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }

    if (form.valid) {
      this.userData.userName = form.value.username;
      this.userData.userLastName = form.value.Lastname;
      this.userData.userFirstName = form.value.userFirstName;
      this.userData.email = form.value.Email;
      this.userData.mobileNumber = form.value.mobileNumber;
      this.userData.userPassword = form.value.Password;
      this.userData.address = form.value.address;
      console.log(form.value.address);

      this.userService.register(this.userData).subscribe(
        (response) => {
          console.log('Registration successful!', response);
          this.router.navigate(['/home'])
        },
        (error) => {
          console.log('Registration failed', error);
        }
      );
    }
  }
}
