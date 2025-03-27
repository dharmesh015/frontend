// src/app/product-display-component/product-display-component.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'app-product-display',
  standalone:false,
  templateUrl: './product-display-component.component.html',
  styleUrls: ['./product-display-component.component.css']
})
export class ProductDisplayComponent implements OnInit {
  products: Product[] = []; // Array to hold the products

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts(); // Load products when the component initializes
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data; // Assign the fetched products to the products array
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}