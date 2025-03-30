import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'app-product-view-details',
  standalone: false,
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css'
})
export class ProductViewDetailsComponent implements OnInit {

product!: Product;
productId!: number;
mainImageIndex: number = 0; // Track which image is currently shown as the main image

constructor(
  private router:Router,
  private route: ActivatedRoute,
  private productService: ProductService
) { }

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.productId = +params['id']; // Convert string to number
    this.getProductDetails(this.productId);
  });
}

getProductDetails(id: number): void {
  this.productService.getProductById(id).subscribe(
    (data: Product) => {
      this.product = data;
      // Transform images like in home component
      this.product.productImages = this.product.productImages.map((image) => {
        return {
          ...image,
          url: `data:${image.type};base64,${image.picByte}`,
        };
      });
    },
    (error:any) => {
      console.error('Error fetching product details:', error);
    }
  );
}

// New method to change the main image
changeMainImage(index: number): void {
  this.mainImageIndex = index;
}

addToCart(productId: number): void {
  // Implement add to cart functionality
  alert("addToCart");
}

// buyNow(productId: number): void {
  // Implement buy now functionality
  // this.router.navigate(['/buyProduct', {issingleProducrCheckout:true,id:productId}]);
  buyNow(productId: number): void {
    console.log("buy calles")
    this.router.navigate(['/buyProduct', 'true', productId]);
  }
}


