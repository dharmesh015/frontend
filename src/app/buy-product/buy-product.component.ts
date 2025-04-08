

import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_service/product.service';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buy-product',
  standalone:false,
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  productDetails: Product[] = [];
  isSingleProductCheckout: boolean = false;
  productId: number = 0;
  mainImageIndex: number = 0; // Track which image is currently shown as the main image
  
  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isSingleProductCheckout = params['issingleProducrCheckout'] === 'true';
      this.productId = +params['productId']; 
      this.getProductDetails(this.isSingleProductCheckout, this.productId);
    });
  }

  getProductDetails(isSingleProductCheckout: boolean, productId: number): void {
    console.log('Getting product details:', isSingleProductCheckout, productId);
    this.productService.getProductDetails(isSingleProductCheckout, productId).subscribe(
      (data: Product[]) => {
        this.productDetails = data;
        this.productDetails.map((product:any) => {
          product.productImages = product.productImages.map((image: { type: any; picByte: any; }) => {
            return {
              ...image,
              url: `data:${image.type};base64,${image.picByte}`,
            };
          });
          return product;
        });
        this.orderDetails.orderProductQuantityList = [];
        
        // Add each product to order list with quantity 1
        this.productDetails.forEach(product => {
          this.orderDetails.orderProductQuantityList.push({
            productId: product.productId,
            quantity: 1
          });
        });
        
        console.log('Order details:', this.orderDetails);
        console.log('Product details:', this.productDetails);
      },
      (error: any) => {
        console.error('Error fetching product details:', error);
        Swal.fire({
          title: "Error",
          text: "Failed to load checkout details",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    );
  }

  // New method to change the main image
  changeMainImage(index: number): void {
    this.mainImageIndex = index;
  }

  placeOrder(orderForm: NgForm): void {
    if (orderForm.invalid) {
      Swal.fire({
        title: "Error",
        text: "Please fill all required fields",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }
    
    // Update order details from form
    this.orderDetails.fullName = orderForm.value.fullName;
    this.orderDetails.fullAddress = orderForm.value.fullAddress;
    this.orderDetails.contactNumber = orderForm.value.contactNumber;
    this.orderDetails.alternateContactNumber = orderForm.value.alternateContactNumber;

    console.log("Placing order:", this.orderDetails);
    
    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
      (response) => {
        Swal.fire({
          title: "Order Placed",
          text: "Your order has been placed successfully.",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          this.router.navigate(['/productlist']);
        });
        orderForm.reset();
      },
      (error) => {
        Swal.fire({
          title: "Error",
          text: "An error occurred while placing your order. Please try again.",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    );
  }

  getQuantityForProduct(productId: number): number {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );
    return filteredProduct.length > 0 ? filteredProduct[0].quantity : 0;
  }

  getCalculatedTotal(productId: number, productDiscountedPrice: number): number {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );
    return filteredProduct.length > 0 ? filteredProduct[0].quantity * productDiscountedPrice : 0;
  }

  onQuantityChanged(q: number, productId: number): void {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    );
    
    if (filteredProduct.length > 0) {
      filteredProduct[0].quantity = q;
    }
  }

  getCalculatedGrandTotal(): number {
    let grandTotal = 0;
    
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const product = this.productDetails.find(p => p.productId === productQuantity.productId);
        if (product) {
          grandTotal += product.productDiscountedPrice * productQuantity.quantity;
        }
      }
    );
    
    return grandTotal;
  }
}