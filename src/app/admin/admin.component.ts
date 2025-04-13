import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { Registrationuser } from '../modul/registrationuser';
import { userdata } from '../modul/userdata';
import Swal from 'sweetalert2';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { ChangeRoleDialogComponent } from '../change-role-dialog/change-role-dialog.component';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  user: userdata[] = [];
  filteredUsers: userdata[] = [];
  size: number = 10;
  page: number = 0;
  totalUsers: number = 0;
  hasMoreUsers: boolean = true;
  searchTerm: string = '';

  constructor(
    private router: Router,
    private userservice: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userservice.getAllUsersPageWise(this.page, this.size).subscribe(
      (data: any) => {
        this.user = data.content;
        this.totalUsers = data.totalElements;
        this.filteredUsers = this.user;
        this.hasMoreUsers = this.user.length === this.size;
        console.log(this.user);
      },
      (error: any) => {
        console.error('Error fetching users', error);
        Swal.fire(
          'Error',
          'Failed to load users. Please try again later.',
          'error'
        );
      }
    );
  }

  filterUsers(): void {
    if (this.searchTerm) {
      this.filteredUsers = this.user.filter((user) =>
        user.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = this.user;
    }
  }

  editUser(username: string): void {
    const editdialog = this.dialog.open(UpdateUserDialogComponent, {
      data: { userName: username },
      width: '500px',
      disableClose: true,
    });

    editdialog.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  deleteUser(name: string, role: string): void {
    if (role === 'User' || role === 'Seller') {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.userservice.deleteUser(name).subscribe(
            () => {
              Swal.fire('Deleted!', 'Your user has been deleted.', 'success');
              this.loadUsers();
            },
            (error: any) => {
              Swal.fire(
                'Error!',
                'There was an error deleting the user.',
                'error'
              );
              console.error('Error deleting user', error);
            }
          );
        }
      });
    } else {
      Swal.fire({
        title: 'Warning',
        text: 'You are not able to delete the admin account!',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadUsers();
    }
  }

  nextPage(): void {
    if (this.hasMoreUsers) {
      this.page++;
      this.loadUsers();
    }
  }
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  changeUserRole(user: userdata): void {
    const dialogRef = this.dialog.open(ChangeRoleDialogComponent, {
      data: { userName: user.userName, currentRole:user.role[0]},
      width: '300px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers(); // Refresh the user list
      }
    });
  }
}
