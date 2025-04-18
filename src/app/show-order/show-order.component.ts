import { Component, OnInit } from '@angular/core';
import { OrderDetails } from '../_model/order-details.model';
import { OrderService } from '../_service/order.service';
import { UserAuthServiceService } from '../_service/user-auth-service.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-show-order',
  standalone:false,
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css']
})export class ShowOrderComponent implements OnInit {
  // All orders loaded from API
  allOrders: MyOrderDetails[] = [];
  // Filtered orders based on search term
  filteredOrders: MyOrderDetails[] = [];
  // Orders to display on current page
  displayedOrders: MyOrderDetails[] = [];
  
  sellerName!: string;
  displayedColumns: string[] = ['fullName', 'orderId', 'product', 'amount', 'status', 'contact', 'date', 'seller'];
  
  // Pagination parameters
  page: number = 0; // Current page (zero-based)
  size: number = 3; // Items per page
  hasMoreOrders: boolean = false;
  
  // Search parameter
  searchTerm: string = '';

  constructor(private orderService: OrderService, private authUser: UserAuthServiceService) {}

  ngOnInit(): void {
    const user = this.authUser.getUser();
    this.sellerName = user.userName;
    const userRole = user.role[0].roleName;
    console.log("userRole--" + userRole);
    
    if (userRole === 'Admin') {
      this.loadAllOrders();
    } else {
      this.loadSellerOrders();
    }
  }

  loadSellerOrders(): void {
    this.orderService.getOrdersBySeller(this.sellerName).subscribe(
      (data: MyOrderDetails[]) => {
        this.allOrders = data;
        this.filterOrders();
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  loadAllOrders(): void {
    this.orderService.getOrderDetails().subscribe(
      (data: MyOrderDetails[]) => {
        this.allOrders = data;
        this.filterOrders();
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }
  
  filterOrders(): void {
    if (!this.searchTerm.trim()) {
      this.filteredOrders = [...this.allOrders];
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredOrders = this.allOrders.filter(order => 
        (order.orderFullName && order.orderFullName.toLowerCase().includes(term)) ||
        (order.orderId && order.orderId.toString().includes(term)) ||
        (order.product && order.product.productName && order.product.productName.toLowerCase().includes(term)) ||
        (order.orderStatus && order.orderStatus.toLowerCase().includes(term)) ||
        (order.orderContactNumber && order.orderContactNumber.includes(term)) ||
        (order.product && order.product.sellername && order.product.sellername.toLowerCase().includes(term))
      );
    }
    
    this.updateDisplayedOrders();
  }

  updateDisplayedOrders(): void {
    const start = this.page * this.size;
    const end = start + this.size;
    this.displayedOrders = this.filteredOrders.slice(start, end);
    this.hasMoreOrders = end < this.filteredOrders.length;
  }

  nextPage(): void {
    if (this.hasMoreOrders) {
      this.page++;
      this.updateDisplayedOrders();
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.updateDisplayedOrders();
    }
  }

  loadOrders(): void {
    // Reset to first page when changing items per page
    this.page = 0;
    this.updateDisplayedOrders();
  }
}