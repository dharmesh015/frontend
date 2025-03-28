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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}