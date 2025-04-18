import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_service/product.service';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import Swal from 'sweetalert2';

declare var Razorpay: any;

@Component({
  selector: 'app-buy-product',
  standalone: false,
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css'],
})
export class BuyProductComponent implements OnInit {
  isLoading = false;
  productDetails: Product[] = [];
  isSingleProductCheckout: boolean = false;
  productId: number = 0;
  mainImageIndex: number = 0;
  
  // Add loading flag
  isProcessingOrder: boolean = false;

  // Flag to check if form is filled
  isFormFilled: boolean = false;

  // Payment details
  paymentDetails: any = {
    razorpayPaymentId: '',
    razorpayOrderId: '',  
    status: '',
    amount: 0,
  };

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: [],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadRazorpayScript();
    this.route.params.subscribe((params) => {
      this.isSingleProductCheckout = params['issingleProducrCheckout'] === 'true';
      this.productId = +params['productId'];
      this.getProductDetails(this.isSingleProductCheckout, this.productId);
    });
  }

  loadRazorpayScript(): void {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }

  getProductDetails(isSingleProductCheckout: boolean, productId: number): void {
    console.log('Getting product details:', isSingleProductCheckout, productId);
    this.productService.getProductDetails(isSingleProductCheckout, productId).subscribe(
      (data: Product[]) => {
        this.productDetails = data;
        this.productDetails.map((product: any) => {
          product.productImages = product.productImages.map(
            (image: { type: any; picByte: any }) => {
              return {
                ...image,
                url: `data:${image.type};base64,${image.picByte}`,
              };
            }
          );
          return product;
        });
        this.orderDetails.orderProductQuantityList = [];

        // Add each product to order list with quantity 1
        this.productDetails.forEach((product) => {
          this.orderDetails.orderProductQuantityList.push({
            productId: product.productId,
            quantity: 1,
          });
        });

        console.log('Order details:', this.orderDetails);
        console.log('Product details:', this.productDetails);
      },
      (error: any) => {
        console.error('Error fetching product details:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load checkout details',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  changeMainImage(index: number): void {
    this.mainImageIndex = index;
  }

  // Initialize Razorpay payment
  processPayment(orderForm: NgForm): void {
    // this.checkFormValidity(orderForm);
    if (!orderForm.valid) return;

    const amount = this.getCalculatedGrandTotal();

    // Create Razorpay order directly on the frontend
    const options = {
      key: 'rzp_test_52fif8pT5IMuCt', // Replace with your Razorpay key ID
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      name: 'Quickcart',
      description: 'Product Purchase',
      handler: this.paymentSuccessHandler.bind(this),
      prefill: {
        name: this.orderDetails.fullName,
        contact: this.orderDetails.contactNumber,
      },
      notes: {
        address: this.orderDetails.fullAddress,
      },
      theme: {
        color: '#3399 cc',
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  }

  // Handler for successful payment
  paymentSuccessHandler(response: any): void {
    this.isProcessingOrder = true;

    this.paymentDetails = {
      razorpayPaymentId: response.razorpay_payment_id,
      razorpayOrderId: response.razorpay_order_id,
      razorpaySignature: response.razorpay_signature,
      status: 'SUCCESS',
      amount: this.getCalculatedGrandTotal(),
    };

    console.log('Payment success:', this.paymentDetails);

    // Now place the order with payment details
    this.placeOrderWithPayment();
  }

  // Updated method to place order with payment details
  placeOrderWithPayment(): void {
    const orderWithPayment = {
      orderDetails: this.orderDetails,
      paymentDetails: this.paymentDetails,
    };

    console.log('Placing order with payment:', orderWithPayment);
    this.isLoading = true;
    this.productService.placeOrderWithPayment(orderWithPayment, this.isSingleProductCheckout).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.isProcessingOrder = false;

        Swal.fire({
          title: 'Order Placed',
          text: 'Your payment was successful and order has been placed.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/productlist']);
        });
      },
      (error: any) => {
        this.isProcessingOrder = false;

        Swal.fire({
          title: 'Error',
          text: 'An error occurred while processing your order. Please contact support.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  // Keep the existing methods
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
    return filteredProduct.length > 0
      ? filteredProduct[0].quantity * productDiscountedPrice
      : 0;
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

    this.orderDetails.orderProductQuantityList.forEach((productQuantity) => {
      const product = this.productDetails.find(
        (p) => p.productId === productQuantity.productId
      );
      if (product) {
        grandTotal += product.productDiscountedPrice * productQuantity.quantity;
      }
    });

    return grandTotal;
  }
}