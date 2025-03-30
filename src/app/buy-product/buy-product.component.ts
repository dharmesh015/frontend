import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_service/product.service';
import { NgForOfContext } from '@angular/common';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buy-product',
  standalone: false,
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css'
})
export class BuyProductComponent implements OnInit {

  productDetail: Product[] = [];
issingleProducrCheckout!: boolean;
productId!: number;
// orderDetails!: Product;
mainImageIndex: number = 0; // Track which image is currently shown as the main image
orderDetails: OrderDetails={
  fullName : '',
  fullAddress: '',
  contactNumber : '',
  alternateContactNumber : '',
  orderProductQuantityList : []
}
constructor(
  private route: ActivatedRoute,
  private productService: ProductService
) { }
// id:productId,issingleProducrCheckout:tru

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.issingleProducrCheckout=params['issingleProducrCheckout']// Convert string to number
    this.productId = +params['productId']; 
    this.getProductDetails(this.issingleProducrCheckout,this.productId);
  });
}

getProductDetails(issingleProducrCheckout:boolean,productId: number): void {
  console.log(productId);
  this.productService.getProductDetails(issingleProducrCheckout,productId).subscribe(
    (data: Product[]) => {
      this.productDetail = data;

      this.productDetail.forEach(x => this.orderDetails.orderProductQuantityList.push( {productId: x.productId, quantity: 1
      }))
    console.log(this.orderDetails);
    console.log(this.productDetail);
  
    },
    (error:any) => {
      console.error('Error fetching product details:', error);
    }
  );
}
  

// New method to change the main image
changeMainImage(index: number): void {
  this.mainImageIndex = index;
}

placeOrder(orderdata:NgForm){
  // console.log(orderDetails.value);
  console.log(this.orderDetails);
  this.orderDetails.fullName=orderdata.value.fullName;
  this.orderDetails.fullAddress=orderdata.value.fullAddress;
  this.orderDetails.contactNumber=orderdata.value.contactNumber;
  this.orderDetails.alternateContactNumber=orderdata.value.alternateContactNumber;


  console.log("place order method");
  console.log(this.orderDetails);
  this.productService.placeOrder(this.orderDetails).subscribe(
    
     (response) => {
           
            Swal.fire({
              title: "place order",
              text: "The order has been place .",
              icon: "success",
              confirmButtonText: "OK"
            });
            // window.location.reload();
            orderdata.reset();
          },
          (error) => {
            Swal.fire({
              title: "Error",
              text: "An error occurred while adding the product. Please try again.",
              icon: "error",
              confirmButtonText: "OK"
            });
          }
  );

}

}