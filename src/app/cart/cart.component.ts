import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_service/product.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Cart } from '../modul/cart';
import { FileHandel } from '../_model/file-handel.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [MatTableModule, MatButtonModule, CommonModule],
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = [
    'Name',
    'Description',
    'Price',
    'Discounted Price',
    'Action',
  ];
  cartDetails: Cart[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getCartDetails();
  }

  delete(cartId: number) {
    this.productService.deleteCartItem(cartId).subscribe(
      (resp: any) => {
        console.log('Item deleted:', resp);
        Swal.fire({
          title: 'Success',
          text: 'Item removed from cart',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.getCartDetails();
      },
      (error: any) => {
        console.log('Error deleting item:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to remove item from cart',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (response: Cart[]) => {
       
        this.cartDetails = response;
        this.cartDetails = this.cartDetails.map((cart: any) => {
          // Map through the product images and convert them to base64 URLs
          cart.product.productImages = cart.product.productImages.map((image: { type: any; picByte: any; }) => {
            return {
              ...image,
              url: `data:${image.type};base64,${image.picByte}`, // Create the base64 URL
            };
          });
          return cart; // Return the modified cart object
        });
        console.log('Cart details:',  this.cartDetails);
      },
      (error: any) => {
        console.log('Error fetching cart:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load cart items',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  checkout() {
    this.router.navigate([
      '/buyProduct',
      {
        issingleProducrCheckout: false,
        productId: 0,
      },
    ]);
  }
  
  gotoproduct() {
    this.router.navigate([
      '/productlist'
    ]);
  }
  // Calculate subtotal
  getSubtotal() {
    return this.cartDetails.reduce((acc, item) => {
      return acc + item.product.productActualPrice; // Assuming productActualPrice is the price before discount
    }, 0);
  }

  // Calculate total discount
  getDiscount() {
    return this.cartDetails.reduce((acc, item) => {
      return acc + (item.product.productActualPrice - item.product.productDiscountedPrice);
    }, 0);
  }

  // Calculate total
  getTotal() {
    return this.getSubtotal() - this.getDiscount();
  }
}