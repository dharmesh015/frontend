import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  onSubmit(form: any) {
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
      
  
      // Log the user object or send it to a service
      console.log(form.value.username+"/--/"+form.value.password);
    }
}
}