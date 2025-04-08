import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registrationuser } from '../modul/registrationuser';
import { Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { UserAuthServiceService } from '../_service/user-auth-service.service';
import { ProductService } from '../_service/product.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-profilepage',
  standalone: false,
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css'],
})
export class ProfilepageComponent implements OnInit {
  userData: Registrationuser = new Registrationuser('', '', '', '', '', '');
  OrderDetails: MyOrderDetails[] = [];
  page: number = 0;
  size: number = 2;
  sortBy: string = 'productName';
  sortDir: string = 'asc';
  hasMoreProducts: boolean = false;
  selectedFile: File | null = null;
  profileImageUrl: SafeUrl | string = '';
  imageLoading: boolean = false;
  hasOrderDetails: boolean = false;
  currentView: string = 'updateProfile';
  form: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private userAuth: UserAuthServiceService,
    private productService: ProductService,
    private fb: FormBuilder 
  ) {
  
    this.form = this.fb.group({
      userFirstName: ['', Validators.required],
      Lastname: ['', Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      Email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.userData = this.userAuth.getUser();
    this.loadProfileImage();
    this.populateForm(); 
  }

  populateForm() {
    this.form.patchValue({
      userFirstName: this.userData.userFirstName,
      Lastname: this.userData.userLastName,
      mobileNumber: this.userData.mobileNumber,
      Email: this.userData.email,
    });
  }

  onSubmit() {
    if (this.form.invalid) {
     
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return; 
    }

  
    this.userData.userFirstName = this.form.value.userFirstName;
    this.userData.userLastName = this.form.value.Lastname;
    this.userData.email = this.form.value.Email;
    this.userData.mobileNumber = this.form.value.mobileNumber;

   
    this.userService.update(this.userData).subscribe(
      (response) => {
        Swal.fire('Success', 'User  details updated successfully', 'success');
      },
      (error) => {
        console.error('Update failed', error);
        Swal.fire('Error', 'Failed to update user details', 'error');
      }
    );
  }
 
  isSeller() {
    return this.userAuth.isSeller();
  }

  isadmin() {
    return this.userAuth.isAdmin();
  }

  loadProducts(): void {
    this.productService
      .getOrderDetails(
        this.userData.userName,
        this.page,
        this.size,
        this.sortBy,
        this.sortDir
      )
      .subscribe(
        (data: any) => {
          this.OrderDetails = data.content.map((order: any) => {
            return {
              // orderId: order.orderId,
              orderFullName: order.orderFullName,
              orderContactNumber: order.orderContactNumber,
              orderStatus: order.orderStatus,
              orderAmount: order.orderAmount,
              date: order.orderDate,
              product:order.product.productName
            };
          });

          
          this.hasOrderDetails = this.OrderDetails.length > 0;
          this.hasMoreProducts =
            (this.page + 1) * this.size < data.totalElements; 
            console.log(this.OrderDetails)
        },
        (error: any) => {
          this.toggleView('updateProfile');
          Swal.fire({
            title: 'No Order History',
            text: 'You have not placed any orders yet.',
            icon: 'info', 
          });
          
          this.router.navigate(['/Profilepage']);
        }
      );
  }

  nextPage(): void {
    if (this.hasMoreProducts) {
      this.page++;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadProducts();
    }
  }

  sortOrderDetails(sortBy: string): void {
    this.sortBy = sortBy;
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    this.loadProducts();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(
          e.target.result
        );
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage(): void {
    if (!this.selectedFile || !this.userData.userName) {
      Swal.fire('Error', 'Please select an image first', 'error');
      return;
    }

    this.imageLoading = true;

    this.productService
      .uploadUserImage(this.userData.userName, this.selectedFile)
      .subscribe(
        (response) => {
          console.log('Image uploaded successfully', response);
          Swal.fire('Success', 'Profile image updated successfully', 'success');
          this.loadProfileImage();
          this.imageLoading = false;
        },
        (error) => {
          console.error('Error uploading image:', error);
          Swal.fire('Success', 'Profile image updated successfully', 'success');
          this.imageLoading = false;
        }
      );
  }

  loadProfileImage(): void {
    if (!this.userData.userName) {
      return;
    }

    this.imageLoading = true;
    this.productService.getUserImage(this.userData.userName).subscribe(
      (imageBlob: Blob) => {
        const objectUrl = URL.createObjectURL(imageBlob);
        this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
        this.imageLoading = false;
      },
      (error) => {
        console.error('Error loading profile image', error);
        this.profileImageUrl = 'assets/default-avatar.jpg';
        this.imageLoading = false;
      }
    );
  }

  toggleView(view: string) {
    if (view === 'orderHistory') {
      this.loadProducts();
    }
    this.currentView = view;
  }
}
