import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller',
  standalone: false,
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit {
  showProductList = true;
  addproductlist = false;
  orderhistory = false;
  isSidebarOpen = true;
  screenWidth: number;

  constructor() {
    this.screenWidth = window.innerWidth;
    this.updateSidebarState();
  }

  ngOnInit(): void {
    // Initial setup
  }

  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.updateSidebarState();
  }

  private updateSidebarState(): void {
    this.isSidebarOpen = this.screenWidth >= 768; // Open sidebar if width is 768 or more
  }

  showProducts(): void {
    this.showProductList = true;
    this.addproductlist = false;
    this.orderhistory = false;
    this.checkSidebarState();
  }

  addProduct(): void {
    this.showProductList = false;
    this.addproductlist = true;
    this.orderhistory = false;
    this.checkSidebarState();
  }

  ordersection(): void {
    this.showProductList = false;
    this.addproductlist = false;
    this.orderhistory = true;
    this.checkSidebarState();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  private checkSidebarState(): void {
    if (this.screenWidth < 768) {
      this.isSidebarOpen = false; // Close sidebar on small screens
    }
  }
}