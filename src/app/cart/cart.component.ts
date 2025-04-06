
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_service/product.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [MatTableModule, MatButtonModule, CommonModule]
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price', 'Action'];
  cartDetails: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  delete(cartId: number) {
    this.productService.deleteCartItem(cartId).subscribe(
      (resp: any) => {
        console.log('Item deleted:', resp);
        Swal.fire({
          title: "Success",
          text: "Item removed from cart",
          icon: "success",
          confirmButtonText: "OK"
        });
        this.getCartDetails();
      }, (error: any) => {
        console.log('Error deleting item:', error);
        Swal.fire({
          title: "Error",
          text: "Failed to remove item from cart",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    );
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (response: any[]) => {
        console.log('Cart details:', response);
        this.cartDetails = response;
      },
      (error: any) => {
        console.log('Error fetching cart:', error);
        Swal.fire({
          title: "Error",
          text: "Failed to load cart items",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    );
  }

  checkout() {
    this.router.navigate(['/buyProduct', {
      issingleProducrCheckout: false,
      productId: 0
    }]);
  }
}