import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { Registrationuser } from '../modul/registrationuser';
import { userdata } from '../modul/userdata';
import Swal from 'sweetalert2';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
// import { Router } from 'express';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  user: userdata[] = [];
  filteredUsers: userdata[] = []; // Array to hold filtered users
  size: number = 10; // Default items per page
  page: number = 0; // Current page
  totalUsers: number = 0; // Total number of users
  hasMoreUsers: boolean = true; // Flag to check if there are more users
  searchTerm: string = ''; // Search term

  constructor(private router: Router, private userservice: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userservice.getAllUsersPageWise(this.page, this.size).subscribe(
      (data: any) => {
        this.user = data.content; // Assuming the response has a 'content' field
        this.totalUsers = data.totalElements; // Assuming the response has a 'totalElements' field
        this.filteredUsers = this.user; // Initialize filtered users
        this.hasMoreUsers = this.user.length === this.size; // Check if there are more users
        console.log(this.user);
      },
      (error: any) => {
        console.error('Error fetching users', error);
        Swal.fire('Error', 'Failed to load users. Please try again later.', 'error');
      }
    );
  }

  filterUsers(): void {
    if (this.searchTerm) {
      this.filteredUsers = this.user.filter(user => 
        user.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = this.user; // Reset to original list if search term is empty
    }
  }

  //  (): void {
  //   this.router.navigate(['/edit-user', username]);
  // }
  
  editUser(username:string): void {
    const editdialog = this.dialog.open(UpdateUserDialogComponent, {
      data: { userName: username },
      width: '500px',
      disableClose: true,
    });


    editdialog.afterClosed().subscribe(result => {
    if (result) {
      this.loadUsers();
    }
  });}

  deleteUser (name: string, role:string): void {
    // alert(role);
    console.log(name)
    if(role==="User" || role ==="Seller"){
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userservice.deleteUser(name).subscribe(
            () => {
              Swal.fire('Deleted!', 'Your user has been deleted.', 'success');
              this.loadUsers(); // Refresh the user list after deletion
            },
            (error: any) => {
              Swal.fire('Error!', 'There was an error deleting the user.', 'error');
              console.error('Error deleting user', error);
            }
          );
        }
      });
    }else{
      Swal.fire({
        title: 'Warning',
        text: 'You are not able to delete the admin account!',
        icon: 'warning',
        confirmButtonText: 'OK'
    });
    }
   
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadUsers(); // Call to load users for the new page
    }
  }

  nextPage(): void {
    if (this.hasMoreUsers) {
      this.page++;
      this.loadUsers(); // Call to load users for the new page
    }
  }
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '500px',
      disableClose: true,
    });


  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.loadUsers();
    }
  });
}
}