
import { Component, OnInit, HostListener } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone:false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showWelcomeMessage = true;
  products: Product[] = [];
  screenWidth: number;
  page: number = 0;
  size: number = 4; 
  sortBy: string = 'productName';
  sortDir: string = 'asc';
  totalProducts: number = 0; 
  hasMoreProducts: boolean = true; 

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private router: Router
  ) {
    // Get initial screen size
    this.screenWidth = window.innerWidth;
  }

  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showWelcomeMessage = false;
      this.loadProducts();
    }, 2000);
    this.loadProducts();
  }

  viewProduct(productId: number) {
    this.router.navigate(['/ProductViewDetails', productId]);
  }
  
  loadProducts(): void {
    this.productService.getAllProductsPageWise(this.page, this.size, this.sortBy, this.sortDir).subscribe(
      (data) => {
        console.log(data.content);
        this.products = data.content.map((product:any) => {
          // Map over the product images to set the base64 URL
          product.productImages = product.productImages.map((image: { type: any; picByte: any; }) => {
            return {
              ...image,
              url: `data:${image.type};base64,${image.picByte}`, // Set the base64 URL
            };
          });
          return product;
        });
        this.totalProducts = data.totalElements;
        this.hasMoreProducts = this.products.length === this.size;
        console.log(data);
        return this.products;
      },
      (error) => {
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
  
   
}