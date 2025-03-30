
// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { Product } from '../_model/product.model';
// import { ProductService } from '../_service/product.service';
// import Swal from 'sweetalert2';
// import { NgForm } from '@angular/forms';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-product-detail-dialog',
//   standalone:false,
//   templateUrl: './product-detail-dialog.component.html',
//   styleUrls: ['./product-detail-dialog.component.css']
// })
// export class ProductDetailDialogComponent {
//   product: Product;

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: Product,
//     private dialog: MatDialog,
//     private productService: ProductService,
//     public dialogRef: MatDialogRef<ProductDetailDialogComponent>
//   ) {
//     // Initialize the product with the data passed to the dialog
//     this.product = { ...data };
//   }

//   close(): void {
//     this.dialogRef.close();
//   }

//   deleteProduct(productId: number): void {
//     this.productService.deleteProduct(productId).subscribe(
//       (response: any) => {
//         this.dialogRef.close();
//         window.location.reload();
//       },
//       (error: any) => {
//         Swal.fire({
//           title: "Error",
//           text: "There was an error deleting the product. Please try again.",
//           icon: "error",
//           confirmButtonText: "OK"
//         });
//       }
//     );
//   }





//   product2: Product = {
//     productId:0,
//     productName: "",
//     productDescription: "",
//     productDiscountedPrice: 0,
//     productActualPrice: 0,
//     productImages: []
//   };


//   submitProduct(productForm: NgForm) {
//       // Check if productImages is empty
  
//       if(productForm.invalid){
//         Swal.fire({
//           title: "No data Provided",
//           text: "Please give data for the product.",
//           icon: "warning", // Use 'warning' icon to indicate a caution
//           confirmButtonText: "OK" // Customize the button text
//         });
//         return;
//       }
      
//       console.log(this.product);
//       const productFormData = this.prepareFormData(this.product);
//       console.log("here")
//       console.log(productFormData);
      
//       this.productService.updateProduct(productFormData).subscribe(
//         (response: Product) => {
//           productForm.reset();
//           this.product.productImages = [];
//           Swal.fire({
//             title: "Product updated",
//             text: "The product has been successfully update.",
//             icon: "success",
//             confirmButtonText: "OK"
//           });
//           window.location.reload();
//           // window.location.reload();
//         },
//         (error: HttpErrorResponse) => {
//           Swal.fire({
//             title: error,
//             text: "An error occurred while adding the product. Please try again.",
//             icon: "error",
//             confirmButtonText: "OK"
//           });
//         }
//       );
//     }
  
//     prepareFormData(product: Product): FormData {
//       const formData = new FormData();
//       formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
  
//       return formData;
//     }
// }
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
    private router: Router  // Inject the Router
  ) {
    // Initialize the product with the data passed to the dialog
    this.product = { ...data };
  }

  close(): void {
    this.dialogRef.close();
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      (response: any) => {
        this.dialogRef.close();
        window.location.reload();
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
    // Check if productImages is empty
    if (productForm.invalid) {
      Swal.fire({
        title: "No data Provided",
        text: "Please give data for the product.",
        icon: "warning", // Use 'warning' icon to indicate a caution
        confirmButtonText: "OK" // Customize the button text
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

        // // Navigate to the home page after an error occurs
        // this.router.navigate(['/']);  // Redirect to home page on error
      }
    );
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));

    return formData;
  }
}
