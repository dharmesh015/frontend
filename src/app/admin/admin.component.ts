import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { Router } from 'express';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
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
