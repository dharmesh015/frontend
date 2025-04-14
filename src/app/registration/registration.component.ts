import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../_service/user.service';
import { Registrationuser } from '../modul/registrationuser';
import { UserAuthServiceService } from '../_service/user-auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  userData: Registrationuser = new Registrationuser('', '', '', '', '', '', '');

  constructor(
    private userService: UserService,
    private router: Router,
    private userAuthServiceService: UserAuthServiceService
  ) {}

  isLoading = false;

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

        this.userService.register(this.userData).subscribe(
            (response) => {
              
                if (response === 'EmailExist') {
                    console.log('Email already exists!', response);
                    Swal.fire({
                        title: 'Email Already In Use',
                        text: 'The email address you entered is already registered. Please use a different email or log in to your account.',
                        icon: 'warning',
                    });
                    return;
                }

         
                if (form.value.role === 'seller') {
                    this.isLoading = true;
                    console.log('Registration for seller!');

                    this.userService.SendEmailForRole(form.value.username, form.value.Email).subscribe(
                        (response: any) => {
                            console.log('Email sent successfully!', response);
                            Swal.fire({
                                title: 'Email Sent',
                                text: 'Your request has been sent to the admin for registration as a seller.',
                                icon: 'info',
                            });
                            this.isLoading = false;
                            this.router.navigate(['/home']);
                        },
                        (error: any) => {
                            console.log('Email sending failed', error);
                            Swal.fire({
                                title: 'Error',
                                text: 'There was an issue sending the email.',
                                icon: 'error',
                            });
                        }
                    );
                } else {
              
                    this.router.navigate(['/home']);
                }
            },
            (error) => {
                console.log('Registration failed', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Registration failed. Please try again.',
                    icon: 'error',
                });
            }
        );
        this.isLoading = false;
    }
}

  islogin(): boolean {
    return this.userAuthServiceService.isLoggedIn();
  }
}
