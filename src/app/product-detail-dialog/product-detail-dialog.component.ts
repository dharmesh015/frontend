
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-product-detail-dialog',
  standalone: false,
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.css']
})
export class ProductDetailDialogComponent implements OnInit {
  showWelcomeMessage = true;
  products: Product[] = [];
  screenWidth: number;
  page: number = 0;
  size: number = 4; 
  sortBy: string = 'productName';
  sortDir: string = 'asc';
  totalProducts: number = 0; 
  hasMoreProducts: boolean = true; 
  messages = [
    'FREE SHIPPING on all orders over $50!',
    'NEW ARRIVALS! Check out our latest products',
    'Use code WELCOME15 for 15% off your first order',
  ];
  currentIndex = 0;
i: any;
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Get initial screen size
    this.screenWidth = window.innerWidth;
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.messages.length;
    }, 4000);
  }

  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
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