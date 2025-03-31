
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-product-detail-dialog',
  standalone: false,
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.css']
})
export class ProductDetailDialogComponent {
  product: Product;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private dialog: MatDialog,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductDetailDialogComponent>,
    private router: Router  
  ) {
    
    this.product = { ...data };
  }

  close(): void {
    this.dialogRef.close();
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      (response: any) => {
        this.dialogRef.close();
       
      },
      (error: any) => {
        Swal.fire({
          title: "Error",
          text: "There was an error deleting the product. Please try again.",
          icon: "error",
          confirmButtonText: "OK"
        });

      }
    );
  }

  product2: Product = {
    productId: 0,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  };

  submitProduct(productForm: NgForm) {
    
    if (productForm.invalid) {
      Swal.fire({
        title: "No data Provided",
        text: "Please give data for the product.",
        icon: "warning", 
        confirmButtonText: "OK" 
      });
      return;
    }

    console.log(this.product);
    const productFormData = this.prepareFormData(this.product);
    console.log("here")
    console.log(productFormData);

    this.productService.updateProduct(productFormData).subscribe(
      (response: Product) => {
        productForm.reset();
        this.product.productImages = [];
        Swal.fire({
          title: "Product updated",
          text: "The product has been successfully updated.",
          icon: "success",
          confirmButtonText: "OK"
        });
        
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          title: "Error",
          text: "An error occurred while adding the product. Please try again.",
          icon: "error",
          confirmButtonText: "OK"
        });

       
      }
    );
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));

    return formData;
  }
}
