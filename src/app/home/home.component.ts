import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate(
          '0.5s ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.5s ease-in',
          style({ opacity: 0, transform: 'translateX(-100%)' })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  showWelcomeMessage = true;
  products: Product[] = [];
  screenWidth: number | undefined;
  page: number = 0;
  size: number = 8; // Increased size to have enough products for the scroller
  sortBy: string = 'productName';
  sortDir: string = 'asc';
  totalProducts: number = 0;
  hasMoreProducts: boolean = true;
  isLoading: boolean = true;
  messages = [
    'FREE SHIPPING on all orders over $50!',
    'NEW ARRIVALS! Check out our latest products',
    'Use code WELCOME15 for 15% off your first order',
  ];
  currentIndex = 0;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Check if running in a browser environment before accessing window
    if (typeof window !== 'undefined') {
      this.screenWidth = window.innerWidth;
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.messages.length;
      }, 4000);
    }
  }

  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Check if running in a browser environment before accessing window
    if (typeof window !== 'undefined') {
      this.screenWidth = window.innerWidth;
    }
  }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    setTimeout(() => {
      this.showWelcomeMessage = false;
    }, 2000);

    this.loadProducts();
  }

  viewProduct(productId: number) {
    this.router.navigate(['/ProductViewDetails', productId]);
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService
      .getAllProductsPageWise(this.page, this.size, this.sortBy, this.sortDir)
      .subscribe(
        (data) => {
          this.products = data.content.map((product: any) => {
            // Map over the product images to set the base64 URL
            product.productImages = product.productImages.map(
              (image: { type: any; picByte: any }) => {
                return {
                  ...image,
                  url: `data:${image.type};base64,${image.picByte}`, // Set the base64 URL
                };
              }
            );
            return product;
          });

          this.totalProducts = data.totalElements;
          this.hasMoreProducts = this.products.length === this.size;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          Swal.fire(
            'Error',
            'Failed to load products. Please try again later.',
            'error'
          );
          console.error('Error fetching products', error);
        }
      );
  }

  // Add click functionality to the SVG controls if needed
  prevScroll(): void {
    // This could be used for manual control if needed
    // You might need to handle animation interruption and restart
  }

  nextScroll(): void {
    // This could be used for manual control if needed
    // You might need to handle animation interruption and restart
  }

  // Make the product items clickable in SVG
  handleProductClick(productId: number): void {
    this.viewProduct(productId);
  }
}
