
// // import { Component, OnInit } from '@angular/core';
// // import { Product } from '../_model/product.model';
// // import { ProductService } from '../_service/product.service';
// // import { MatDialog } from '@angular/material/dialog';
// // import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog.component';

// // @Component({
// //   selector: 'app-product-list',
// //   standalone: false,
// //   templateUrl: './product-list.component.html',
// //   styleUrls: ['./product-list.component.css']
// // })
// // export class ProductListComponent implements OnInit {
// //   products: Product[] = [];
// //   displayedColumns: string[] = ['productName', 'productDescription', 'productActualPrice']; 

// //   constructor(private productService: ProductService, private dialog: MatDialog) {}

// //   ngOnInit(): void {
// //     this.getAllProducts();
// //   }

// //   getAllProducts(): void {
// //     this.productService.getAllProducts().subscribe(
// //       (response: Product[]) => {
// //         this.products = response.map(product => {
// //           product.productImages = product.productImages.map(image => {
// //             return {
// //               ...image,
// //               url: `data:${image.type};base64,${image.picByte}`
// //             };
// //           });
// //           return product;
// //         });
// //       },
// //       (error) => {
// //         console.error('Error fetching products', error);
// //       }
// //     );
// //   }

// //   openDialog(product: Product): void {
// //     const dialogRef = this.dialog.open(ProductDetailDialogComponent, {
// //       width: '500px',
// //       data: product 
// //     });

// //     dialogRef.afterClosed().subscribe(result => {
// //       console.log('The dialog was closed');
// //     });
// //   }
// // }
// import { Component, OnInit } from '@angular/core';
// import { Product } from '../_model/product.model';
// import { ProductService } from '../_service/product.service';
// import Swal from 'sweetalert2';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-product-list',
//   standalone:false,
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit {
//   products: Product[] = [];

//   constructor(private productService: ProductService, private router: Router) {}

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts(): void {
//     this.productService.getAllProducts().subscribe((data: Product[]) => {
//       this.products = data;
//     });
//   }

//   editProduct(id: number): void {
//     // Redirect to the edit product page
//     this.router.navigate(['/editproduct',id]);
//   }

//   deleteProduct(productId: number): void {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'No, cancel!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.productService.deleteProduct(productId).subscribe(
//           () => {
//             Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
//             this.loadProducts(); // Refresh the product list
//           },
//           (error: any) => {
//             Swal.fire('Error!', 'There was an error deleting the product.', 'error');
//           }
//         );
//       }
//     });
//   }


  
// }
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
  // Array to hold the list of products
  products: Product[] = [];

  // Injecting necessary services
  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load the list of products when the component initializes
    this.loadProducts();
  }

  // Method to fetch all products from the backend
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        // Map through the response to format product images
        this.products = data.map(product => {
          if (product.productImages) {
            product.productImages = product.productImages.map(image => {
              return {
                ...image,
                url: `data:${image.type};base64,${image.picByte}` // Convert base64 image data to a usable URL
              };
            });
          }
          return product;
        });
      },
      (error) => {
        // Handle any error that occurs during the request
        Swal.fire('Error', 'Failed to load products. Please try again later.', 'error');
        console.error('Error fetching products', error);
      }
    );
  }

  // Method to redirect the user to the edit product page
  editProduct(id: number): void {
    this.router.navigate(['/editproduct', id]);
  }

  // Method to delete a product with a confirmation dialog
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
        // Call the delete service and handle success/failure
        this.productService.deleteProduct(productId).subscribe(
          () => {
            Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            this.loadProducts(); // Refresh the product list after deletion
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
