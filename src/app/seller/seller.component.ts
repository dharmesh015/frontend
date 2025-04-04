import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller',
  standalone: false,
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent {
  showProductList: boolean = true; // Default to showing product list

  constructor(private router:Router){}

  showProducts() {
    this.showProductList = true; // Show product list
  }

  addProduct() {
    this.showProductList = false; // Show add product form
  }

  homepage(){
    this.router.navigate(['/home'])
  }
}

