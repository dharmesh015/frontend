import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  constructor(private userservice: UserService ) {}

  sendemail(form: NgForm) {
    if (form.valid) {
      this.userservice.sendEmail(form.value.email).subscribe(
        response => {
          
          Swal.fire({
            title: 'Email Sent',
            text: 'A password reset link has been sent to your email address.',
            icon: 'success', // Change the icon to 'success'
            confirmButtonText: 'OK', // Customize the button text
          });
                  
        },
        error => {
          Swal.fire({
            title: 'Error Sending Email',
            text: 'The username or password you entered is incorrect. Please try again.',
            icon: 'error', // Change the icon to 'error' to indicate a problem
            confirmButtonText: 'OK', // Customize the button text
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Invalid Input',
        text: 'Please enter a valid email address.',
        icon: 'warning', // Change the icon to 'warning'
        confirmButtonText: 'OK', // Customize the button text
      });
    }
  }
}
