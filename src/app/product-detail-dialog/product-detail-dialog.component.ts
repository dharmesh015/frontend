import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'app-product-detail-dialog',
  standalone:false,
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.css']
})
export class ProductDetailDialogComponent {constructor(
  @Inject(MAT_DIALOG_DATA) public data: Product,
  private productService: ProductService, // Inject ProductService here
  public dialogRef: MatDialogRef<ProductDetailDialogComponent>
) {}

close(): void {
  this.dialogRef.close();
}

deleteProduct(id:number): void {
  console.log(id);

 
  this.productService.deleteProduct(id).subscribe({
    // next: () => {
    //   this.dialogRef.close(true); // Indicate successful deletion
    // },
    // error: (error: any) => {
    //   console.error('Error deleting product:', error);
    //   // Handle error (e.g., show an error message)
    //   this.dialogRef.close(false); // Indicate deletion failure.
    // },
  });
}

updateProduct(): void {
  // Implement your update logic here
  console.log('Update product called');
  this.dialogRef.close(false);
}
}