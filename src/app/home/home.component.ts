
import { Component, OnInit, HostListener } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
      this.getAllProducts();
    }, 3000);
    this.getAllProducts();
  }

  getAllProducts(): void {
        this.productService.getAllProducts().subscribe(
          (response: Product[]) => {
            this.products = response.map((product) => {
              product.productImages = product.productImages.map((image) => {
                return {
                  ...image,
                  url: `data:${image.type};base64,${image.picByte}`, 
                };
              });
              return product;
            });
          },
          (error) => {
            console.error('Error fetching products', error);
          }
        );
      }

  viewProduct(productId: number) {
    this.router.navigate(['/ProductViewDetails', productId]);
  }
}