import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  showWelcomeMessage = true;
  value: any[] = [];
  products: Product[] = [];
  screenWidth: number;
  page: number = 0;
  size: number = 4;
  sortBy: string = 'productName';
  sortDir: string = 'asc';
  totalProducts: number = 0;
  hasMoreProducts: boolean = true;
  slides = [
    {
      url: 'https://img.freepik.com/free-photo/view-hawaiian-shirt-with-floral-print-hanger_23-2149366088.jpg?t=st=1744113643~exp=1744117243~hmac=107074629463faddf69ea4527d96e40f69c65374dce95b4c54984130740d2f43&w=996',
      alt: 'Summer Collection',
      title: 'Summer Collection 2025',
      subtitle: 'Discover our latest fashion trends'
    },
    {
      url: 'https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309643.jpg?semt=ais_country_boost&w=740',
      alt: 'Electronics Sale',
      title: 'Electronics Sale',
      subtitle: 'Up to 40% off on selected items'
    },
    {
      url: 'https://img.freepik.com/free-photo/mid-century-modern-living-room-interior-design-with-monstera-tree_53876-129805.jpg?t=st=1744113699~exp=1744117299~hmac=e98b0caa9468f37f628f665ebd426528ca3fedb7d6bc78367ff2dc693831fe3f&w=996',
      alt: 'Home Decor',
      title: 'Home Decor',
      subtitle: 'Transform your living space'
    },
    {
      url: 'https://img.freepik.com/premium-photo/3d-render-southwestern-blank-wooden-sign-board-new-arrivals-boxes-ribbons-tags-main-object-is-bo_1020495-703528.jpg?ga=GA1.1.2032872767.1743150563&semt=ais_hybrid&w=740',
      alt: 'New Arrivals',
      title: 'New Arrivals',
      subtitle: 'Be the first to shop our latest products'
    }
  ];
  
  // For infinite carousel
  currentSlide = 0;
  direction = 'forward';
  isTransitioning = false;
  slideInterval: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.startSlideShow();
    this.loadProducts();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      this.slideInterval.unsubscribe();
    }
  }

  startSlideShow() {
    this.slideInterval = interval(5000).subscribe(() => {
      this.nextSlide();
    });
  }

  nextSlide() {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.direction = 'forward';
    
    // Normal move to next slide
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    
    // Reset transitioning flag after animation completes
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  prevSlide() {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.direction = 'backward';
    
    // Move to previous slide with wraparound
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    
    // Reset transitioning flag after animation completes
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  setCurrentSlide(index: number) {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    
    // Determine direction for animation
    if (index > this.currentSlide) {
      this.direction = 'forward';
    } else if (index < this.currentSlide) {
      this.direction = 'backward';
    }
    
    this.currentSlide = index;
    
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  viewProduct(productId: number) {
    this.router.navigate(['/ProductViewDetails', productId]);
  }

  loadProducts(): void {
    this.productService.getAllProductsPageWise(this.page, this.size, this.sortBy, this.sortDir).subscribe(
      (data) => {
        this.products = data.content.map((product: any) => {
          product.productImages = product.productImages.map((image: { type: any; picByte: any; }) => {
            return {
              ...image,
              url: `data:${image.type};base64,${image.picByte}`,
            };
          });
          return product;
        });
        this.totalProducts = data.totalElements;
        this.hasMoreProducts = this.products.length === this.size;
      },
      (error) => {
        Swal.fire('Error', 'Failed to load products. Please try again later.', 'error');
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