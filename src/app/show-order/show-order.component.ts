import { Component, OnInit } from '@angular/core';
import { OrderDetails } from '../_model/order-details.model';
import { OrderService } from '../_service/order.service';
import { ActivatedRoute, Route } from '@angular/router';
import { UserAuthServiceService } from '../_service/user-auth-service.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-show-order',
  standalone: false,
  templateUrl: './show-order.component.html',
  styleUrl: './show-order.component.css'
})
export class ShowOrderComponent implements OnInit {
  orders: MyOrderDetails[] = [];
  sellerName!: string ;
  displayedColumns: string[] = ['fullName', 'orderId', 'product', 'amount', 'status', 'contact', 'date','seller'];
  constructor(private orderService: OrderService,private authUser:UserAuthServiceService) {}

  ngOnInit(): void {
    const user = this.authUser.getUser();
    this.sellerName = this.authUser.getUser().userName;
    // this.loadOrders();
    const userRole = this.authUser.getUser().role[0].roleName;
    console.log("userRole--"+userRole) // Method to get user role (admin or seller)
    
    // Check user role to determine which orders to fetch
    if (userRole === 'Admin') {
      this.loadAllOrders();
    } else {
      this.loadSellerOrders();
    }
  }

  loadSellerOrders(): void {
    this.orderService.getOrdersBySeller(this.sellerName).subscribe(
      (data: MyOrderDetails[]) => {
        console.log(data)
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  loadAllOrders(): void {
    this.orderService.getOrderDetails().subscribe(
      (data: MyOrderDetails[]) => {
        console.log(data)
        this.orders = data;
        console.log( this.orders )
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }
}
