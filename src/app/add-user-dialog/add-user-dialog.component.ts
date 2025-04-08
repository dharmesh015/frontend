import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_service/user.service';
import { Registrationuser } from '../modul/registrationuser';

@Component({
  selector: 'app-add-user-dialog',
  standalone: false,
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.css',
})
export class AddUserDialogComponent {
  form!: FormGroup;

  userData: Registrationuser = new Registrationuser('', '', '', '', '', '', '');
  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userservice: UserService
  ) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      userPassword :[
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).*$/),
        ],
      ],
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      address: [''],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userData.userName = this.form.value.username;
      this.userData.userLastName = this.form.value.Lastname;
      this.userData.userFirstName = this.form.value.userFirstName;
      this.userData.email = this.form.value.Email;
      this.userData.mobileNumber = this.form.value.mobileNumber;
      this.userData.userPassword = this.form.value.Password;
      this.userData.address = this.form.value.address;
      this.userservice.register(this.form.value).subscribe(() => {
        this.dialogRef.close(true);
      });
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
