import { Component, OnInit } from '@angular/core';
import { Registrationuser } from '../modul/registrationuser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { UserAuthServiceService } from '../_service/user-auth-service.service';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';
import { MyOrderDetails } from '../_model/order.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profilepage',
  standalone: false,
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css'
})
export class ProfilepageComponent implements OnInit {

  userData: Registrationuser = new Registrationuser("","","","","","");
  email!:any;
  OrderDetails: MyOrderDetails[] = [];
  products: Product[] = [];
  page: number = 0;
  size: number = 2; 
  sortBy: string = 'productName';
  sortDir: string = 'asc';
  totalProducts: number = 0; 
  hasMoreProducts: boolean = true; 
  selectedFile: File | null = null;
  profileImageUrl: SafeUrl | string = '';
  imageLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private userAuth: UserAuthServiceService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.userData = this.userAuth.getUser();
    if(!this.userAuth.isAdmin()){
      this.loadProducts();
    }
    this.loadProfileImage();
    console.log(this.userData.userName);
  }

  isadmin() {
    return this.userAuth.isAdmin();
  }

  loadProducts(): void {
    this.productService.getOrderDetails(this.userData.userName, this.page, this.size, this.sortBy, this.sortDir).subscribe(
      (data: any) => {
        console.log(data.content);
        
        this.OrderDetails = data.content.map((order: any) => {
          return {
            orderId: order.orderId,
            orderFullName: order.orderFullName,
            orderFullOrder: order.orderFullOrder,
            orderContactNumber: order.orderContactNumber,
            orderAlternateContactNumber: order.orderAlternateContactNumber,
            orderStatus: order.orderStatus,
            orderAmount: order.orderAmount,
            product: order.product,
            user: order.user,
            date: order.orderDate
          };
        });
        console.log(this.OrderDetails);
      },
      (error: any) => {
        Swal.fire('Error', 'Failed to load products. Please try again later.', 'error');
        console.error('Error fetching products', error);
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
    
    // Show preview of selected image (optional)
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
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
    
    this.productService.uploadUserImage(this.userData.userName, this.selectedFile)
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
    
    this.productService.getUserImage(this.userData.userName)
      .subscribe(
        (imageBlob: Blob) => {
          const objectUrl = URL.createObjectURL(imageBlob);
          this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
          this.imageLoading = false;
        },
        (error) => {
          console.error('Error loading profile image', error);
          // Set a default image if user doesn't have one yet
          this.profileImageUrl = 'assets/default-avatar.jpg';
          this.imageLoading = false;
        }
      );
  }
}