import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_service/user.service';
import { Registrationuser } from '../modul/registrationuser';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserAuthServiceService } from '../_service/user-auth-service.service';
import { response } from 'express';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user-dialog',
  standalone: false,
  templateUrl: './update-user-dialog.component.html',
  styleUrl: './update-user-dialog.component.css',
})
export class UpdateUserDialogComponent implements OnInit {
  form!: FormGroup;
  userName: string;
  userData: Registrationuser = new Registrationuser('', '', '', '', '', '', '');

  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userservice: UserService,
    private userAuth: UserAuthServiceService
  ) {
    this.userName = data.userName;
    this.form = this.fb.group({
      userName: [this.userName, Validators.required],
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      address: [''],
    });
  }

  ngOnInit(): void {
    this.userservice.getUserByName(this.userName).subscribe(
      (response: any) => {
        this.userData.userName = response.userName;
        this.userData.address = response.address;
        this.userData.email = response.email;
        this.userData.userFirstName = response.userFirstName;
        this.userData.userLastName = response.userLastName;
        this.userData.mobileNumber = response.mobileNumber;

        this.form.patchValue({
          userName: this.userData.userName,
          userLastName: this.userData.userLastName,
          userFirstName: this.userData.userFirstName,
          email: this.userData.email,
          mobileNumber: this.userData.mobileNumber,
          address: this.userData.address,
        });
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('onsubmit----', this.form.value);

      this.userData.userLastName = this.form.value.userLastName;
      this.userData.userFirstName = this.form.value.userFirstName;
      this.userData.email = this.form.value.email;
      this.userData.mobileNumber = this.form.value.mobileNumber;
      this.userData.address = this.form.value.address;
      this.userservice.update(this.userData).subscribe((rs) => {
        this.dialogRef.close(true);
      });
    }
  }

  popop() {
    Swal.fire({
      title: 'Success',
      text: 'successfully update user data.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
