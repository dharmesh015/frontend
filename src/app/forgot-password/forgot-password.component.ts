import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_service/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
 
  isLoading = false;
  token: string = '';
  constructor(
    private userService: UserService,
    private acrouter: ActivatedRoute,
    private router: Router
  ) {}

  sendEmail(form: NgForm) {
    if (form.valid) {
      this.userService.sendEmail(form.value.email).subscribe(
        (response) => {
          this.isLoading = false;
          console.log("Response received:", response);
          
          if (response === "UNF") {
            Swal.fire({
              title: 'User Not Found',
              text: 'The email address you entered is not associated with any account. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          } else if (response === "S") {
            Swal.fire({
              title: 'Email Sent',
              text: 'A password reset link has been sent to your email address.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            form.resetForm();
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Something went wrong. Please try again later.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        },
        (error) => {
          
        }
      );
    } else {
      Swal.fire({
        title: 'Invalid Input',
        text: 'Please enter a valid email address.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  }

}
