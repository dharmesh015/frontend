
import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  page: number = 0;
  size: number = 5; 
  sortBy: string = 'productName';
  sortDir: string = 'asc';
  totalProducts: number = 0; 
  hasMoreProducts: boolean = true; 

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProductsPageWise(this.page, this.size, this.sortBy, this.sortDir).subscribe( (data) => {
      this.products = data.content; 
      this.totalProducts = data.totalElements; 
      this.hasMoreProducts = this.products.length === this.size; 
      console.log(data);
      return this.products;
    }, (error) => {
      Swal.fire('Error', 'Failed to load products. Please try again later.', 'error');
      console.error('Error fetching products', error);
    });
  }

  nextPage(): void {
    if (this.hasMoreProducts) {
      this.page++;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadProducts();
    }
  }

  sortProducts(sortBy: string): void {
    this.sortBy = sortBy;
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'; 
    this.loadProducts();
  }
  editProduct(id: number): void {
    this.router.navigate(['/editproduct', id]);
  }

  deleteProduct(productId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe(
          () => {
            Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            this.loadProducts(); 
          },
          (error: any) => {
            Swal.fire('Error!', 'There was an error deleting the product.', 'error');
            console.error('Error deleting product', error);
          }
        );
      }
    });
  }
}
