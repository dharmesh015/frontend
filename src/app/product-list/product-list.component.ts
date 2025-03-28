// import { Component, OnInit } from '@angular/core';
// import { Product } from '../_model/product.model';
// import { ProductService } from '../_service/product.service';
// import { MatDialog } from '@angular/material/dialog';
// import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog.component';
// // import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog.component';

// @Component({
//   selector: 'app-product-list',
//   standalone:false,
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit {
//   products: Product[] = [];

//   constructor(private productService: ProductService, private dialog: MatDialog) {}

//   ngOnInit(): void {
//     this.getAllProducts();
//   }

//   getAllProducts(): void {
//     this.productService.getAllProducts().subscribe(
//       (response: Product[]) => {
//         this.products = response;
//       },
//       (error) => {
//         console.error('Error fetching products', error);
//       }
//     );
//   }

//   openDialog(product: Product): void {
//     const dialogRef = this.dialog.open(ProductDetailDialogComponent, {
//       width: '600px',
//       data: product
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog.component';

@Component({
  selector: 'app-product-list',
    standalone:false,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response.map(product => {
          product.productImages = product.productImages.map(image => {
            return {
              ...image,
              url: `data:${image.type};base64,${image.picByte}` // Set the URL for the image
            };
          });
          console.log(product);
          return product;
        });
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  openDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductDetailDialogComponent, {
      width: '500px',
      data: product // Pass the entire product object
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  
}