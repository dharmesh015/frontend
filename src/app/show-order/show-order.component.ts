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
  displayedColumns: string[] = ['fullName', 'orderId', 'product', 'amount', 'status', 'contact', 'date'];
  constructor(private orderService: OrderService,private authUser:UserAuthServiceService) {}

  ngOnInit(): void {
    this.sellerName = this.authUser.getUser().userName;
    this.loadOrders();
  }

  loadOrders(): void {
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
}
