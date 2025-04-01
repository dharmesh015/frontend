import { Component, OnInit } from '@angular/core';
import { Registrationuser } from '../modul/registrationuser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { UserAuthServiceService } from '../_service/user-auth-service.service';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'app-profilepage',
  standalone: false,
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css'
})
export class ProfilepageComponent implements OnInit {

  userData: Registrationuser = new Registrationuser("","","","","","");
  email!:any;
  
    products: Product[] = [];
    page: number = 0;
    size: number = 2; 
    sortBy: string = 'productName';
    sortDir: string = 'asc';
    totalProducts: number = 0; 
    hasMoreProducts: boolean = true; 
  // productId!: number;
  // mainImageIndex: number = 0; // Track which image is currently shown as the main image

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private userAuth:UserAuthServiceService,
    private productservice:ProductService
  ) {}

  ngOnInit(): void {
    this.userData= this.userAuth.getUser();
    console.log(this.userData);
    this.loadProducts();
  }
  isadmin(){
    return this.userAuth.isAdmin();
  }


    loadProducts(): void {
      this.productservice.getAllProductsPageWise(this.page, this.size, this.sortBy, this.sortDir).subscribe( (data) => {
        console.log(data.content);
        this.products = data.content; 
        this.totalProducts = data.totalElements; 
        this.hasMoreProducts = this.products.length === this.size; 
        console.log(data);
        return this.products;
      }, (error) => {
        Swal.fire('Error', 'Failed to load products. Please try again later.', 'error');
        console.error('Error fetching products', error);
      });
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
  
    sortProducts(sortBy: string): void {
      this.sortBy = sortBy;
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'; // Toggle sort direction
      this.loadProducts();
    }
}