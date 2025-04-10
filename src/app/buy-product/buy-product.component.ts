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
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  productDetails: Product[] = [];
  isSingleProductCheckout: boolean = false;
  productId: number = 0;
  mainImageIndex: number = 0;
  
  // Flag to check if form is filled
  isFormFilled: boolean = false;
  
  // Payment details
  paymentDetails: any = {
    razorpayPaymentId: '',
    razorpayOrderId: '',
    razorpaySignature: '',
    status: '',
    amount: 0
  };
  
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
    this.loadRazorpayScript();
    this.route.params.subscribe(params => {
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
  // loadRazorpayScript(): void {
  //   const script = document.createElement('script');
  //   script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  //   script.async = true;
  //   script.onload = () => {
  //     console.log('Razorpay script loaded successfully');
  //   };
  //   script.onerror = () => {
  //     console.error('Error loading Razorpay script');
  //   };
  //   document.body.appendChild(script);
  // }

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

  changeMainImage(index: number): void {
    this.mainImageIndex = index;
  }

  // Check if form is filled and valid
  checkFormValidity(orderForm: NgForm): void {
    if(orderForm.valid){

      this.isFormFilled = orderForm.valid;
    }
    
    // Update order details from form
    if (orderForm.valid) {
      this.orderDetails.fullName = orderForm.value.fullName;
      this.orderDetails.fullAddress = orderForm.value.fullAddress;
      this.orderDetails.contactNumber = orderForm.value.contactNumber;
      this.orderDetails.alternateContactNumber = orderForm.value.alternateContactNumber;
    } else {
      Swal.fire({
        title: "Error",
        text: "Please fill all required fields",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  }

  // Initialize Razorpay payment
  // In buy-product.component.ts
processPayment(): void {
  const amount = this.getCalculatedGrandTotal();
  
  // First, create an order on your backend
  this.productService.createRazorpayOrder(amount).subscribe(
    (orderData: any) => {
      const options = {
        key: 'rzp_test_52fif8pT5IMuCt', // Make sure this is your correct key
        amount: amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'Your Store Name',
        description: 'Product Purchase',
        order_id: orderData.id, // Use the order ID from your backend
        handler: this.paymentSuccessHandler.bind(this),
        prefill: {
          name: this.orderDetails.fullName,
          contact: this.orderDetails.contactNumber
        },
        notes: {
          address: this.orderDetails.fullAddress
        },
        theme: {
          color: '#3399cc'
        }
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    },
    (error:any) => {
      console.error('Error creating Razorpay order:', error);
      Swal.fire({
        title: "Payment Error",
        text: "Could not initialize payment gateway. Please try again.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  );
}

  // Handler for successful payment
  paymentSuccessHandler(response: any): void {
    this.paymentDetails = {
      razorpayPaymentId: response.razorpay_payment_id,
      razorpayOrderId: response.razorpay_order_id,
      razorpaySignature: response.razorpay_signature,
      status: 'SUCCESS',
      amount: this.getCalculatedGrandTotal()
    };
    
    console.log("Payment success:", this.paymentDetails);
    
    // Now place the order with payment details
    this.placeOrderWithPayment();
  }

  // Updated method to place order with payment details
  placeOrderWithPayment(): void {
    const orderWithPayment = {
      orderDetails: this.orderDetails,
      paymentDetails: this.paymentDetails
    };
    
    console.log("Placing order with payment:", orderWithPayment);
    
    this.productService.placeOrderWithPayment(orderWithPayment, this.isSingleProductCheckout).subscribe(
      (response:any) => {
        Swal.fire({
          title: "Order Placed",
          text: "Your payment was successful and order has been placed.",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          this.router.navigate(['/productlist']);
        });
      },
      (error:any) => {
        Swal.fire({
          title: "Error",
          text: "An error occurred while processing your order. Please contact support.",
          icon: "error",
          confirmButtonText: "OK"
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