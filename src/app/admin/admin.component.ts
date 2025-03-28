import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  showProductList: boolean = true; // Default to showing product list

  showProducts() {
    this.showProductList = true; // Show product list
  }

  addProduct() {
    this.showProductList = false; // Show add product form
  }
}
