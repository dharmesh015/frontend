
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 

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
  size: number = 8; 
  sortBy: string = 'productName';
  sortDir: string = 'asc';
  totalProducts: number = 0; 
  hasMoreProducts: boolean = true; 


i: any;
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.screenWidth = window.innerWidth;
    
  }
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
    this.productService.getAllProducts().subscribe(
      (data:Product[]) => {
        // console.log(data.content);
        this.products = data.map((product:any) => {
          product.productImages = product.productImages.map((image: { type: any; picByte: any; }) => {
            return {
              ...image,
              url: `data:${image.type};base64,${image.picByte}`,
            };
          });
          return product;
        });
       
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