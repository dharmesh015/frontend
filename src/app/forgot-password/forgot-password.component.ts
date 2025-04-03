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
  //   constructor(private userservice: UserService) {}

  //   sendEmail(form: NgForm) {
  //     if (form.valid) {
  //       this.userservice.sendEmail(form.value.email).subscribe(
  //         response => {
  //           if (response === 'User  not found') {
  //             Swal.fire({
  //               title: 'User  Not Found',
  //               text: 'The email address you entered is not associated with any account. Please try again.',
  //               icon: 'error',
  //               confirmButtonText: 'OK',
  //             });
  //           } else {
  //             Swal.fire({
  //               title: 'Success',
  //               text: 'A password reset link has been sent to your email address.',
  //               icon: 'success',
  //               confirmButtonText: 'OK',
  //             });
  //           }
  //         },
  //         error => {
  //           Swal.fire({
  //             title: 'Error',
  //             text: 'An error occurred while sending the email. Please try again later.',
  //             icon: 'error',
  //             confirmButtonText: 'OK',
  //           });
  //         }
  //       );
  //     } else {
  //       Swal.fire({
  //         title: 'Invalid Input',
  //         text: 'Please enter a valid email address.',
  //         icon: 'warning',
  //         confirmButtonText: 'OK',
  //       });
  //     }
  //   }
  isLoading = false;
  token: string = '';
  constructor(
    private userService: UserService,
    private acrouter: ActivatedRoute,
    private router: Router
  ) {}

  sendEmail(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;

      this.userService.sendEmail(form.value.email).subscribe(
        (response) => {
          this.isLoading = false;

          if (response === 'User not found') {
            Swal.fire({
              title: 'User Not Found',
              text: 'The email address you entered is not associated with any account. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          } else if (response === 'Success') {
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
          this.isLoading = false;
          console.error('Error sending email:', error);

          Swal.fire({
            title: 'Error',
            text: 'An error occurred while sending the email. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
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

  // ngOnInit(): void {
  //   // Get token from URL query parameters
  //   this.acrouter.queryParams.subscribe(params => {
  //     this.token = params['token'];

  //     if (!this.token) {
  //       // If no token is provided, redirect to forgot password page
  //       Swal.fire({
  //         title: 'Invalid Reset Link',
  //         text: 'The password reset link is invalid or has expired.',
  //         icon: 'error',
  //         confirmButtonText: 'OK'
  //       }).then(() => {
  //         this.router.navigate(['/forgot-password']);
  //       });
  //     }
  //   });
  // }
}
