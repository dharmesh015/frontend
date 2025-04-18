import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_service/product.service';
import Swal from 'sweetalert2';
import { UserAuthServiceService } from '../_service/user-auth-service.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-product-view-details',
  standalone: false,
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css'],
})
export class ProductViewDetailsComponent implements OnInit {
  product!: Product;
  productId!: number;
  mainImageIndex: number = 0;
  selectedSize!:string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private authserice: UserAuthServiceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = +params['id'];
      this.getProductDetails(this.productId);
    });
  }

  getDeliveryDate(): string {
    const currentDate = new Date(); 
    const deliveryDate = new Date(currentDate); 
    deliveryDate.setDate(currentDate.getDate() + 3); 
    return deliveryDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
  getProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe(
      (data: Product) => {
        this.product = data;
        if (this.product.productImages) {
          this.product.productImages = this.product.productImages.map(
            (image) => {
              return {
                ...image,
                url: `data:${image.type};base64,${image.picByte}`,
              };
            }
          );
        }
      },
      (error: any) => {
        console.error('Error fetching product details:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load product details',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  changeMainImage(index: number): void {
    this.mainImageIndex = index;
  }

  public roleMatchs(rol: any): boolean {
    return this.userService.roleMatch(rol);
  }

  addToCart(productId: number): void {
    console.log('add to cart');
    if (!this.authserice.isLoggedIn()) {
      // Redirect to login page if not logged in
      this.router.navigate(['/login']);
    } else {
     
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log('Product added to cart:', response);
        Swal.fire({
          title: 'Success',
          text: 'Product added to cart',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.router.navigate(['/showcart']);
      },
      (error) => {
        console.log('Error adding to cart:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to add product to cart',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
  }
  buyNow(productId:number):void {
    console.log('buy called');
    if (!this.authserice.isLoggedIn()) {
      // Redirect to login page if not logged in
      this.router.navigate(['/login']);
    } else {
    this.router.navigate([
      '/buyProduct',
      {
        issingleProducrCheckout: true,
        productId: productId,
      },
    ]);
  }
  }
  isuser(){
    return this.authserice.isUser();
  }
}
