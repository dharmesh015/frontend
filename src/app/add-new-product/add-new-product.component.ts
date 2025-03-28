import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileHandel } from '../_model/file-handel.model';
import { ProductService } from '../_service/product.service';
import { Console } from 'node:console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-product',
  standalone: false,
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  isNewProduct = true;
  product: Product = {
    productId:0,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  };

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize product from route data or keep default
    const productData = this.activatedRoute.snapshot.data['product'];
    if (productData) {
      this.product = productData;
      this.isNewProduct = false;
    }
  }

  addProduct(productForm: NgForm) {
    // Check if productImages is empty

    if(productForm.invalid){
      Swal.fire({
        title: "No data Provided",
        text: "Please give data for the product.",
        icon: "warning", // Use 'warning' icon to indicate a caution
        confirmButtonText: "OK" // Customize the button text
      });
      return;
    }
    if (this.product.productImages.length === 0) {
      Swal.fire({
        title: "No Images Provided",
        text: "Please upload at least one image for the product.",
        icon: "warning", // Use 'warning' icon to indicate a caution
        confirmButtonText: "OK" // Customize the button text
      });
      return; // Exit the method if no images are provided
    }
  
    const productFormData = this.prepareFormData(this.product);
    
    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        productForm.reset();
        this.product.productImages = [];
        Swal.fire({
          title: "Product Added",
          text: "The product has been successfully added.",
          icon: "success",
          confirmButtonText: "OK"
        });
        // window.location.reload();
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

    for (let i = 0; i < product.productImages.length; i++) {
      formData.append('imageFile', product.productImages[i].file, product.productImages[i].file.name);
    }

    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileHandel: FileHandel = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
          type: '',
          picByte: ''
        };
        this.product.productImages.push(fileHandel);
      }
    }
  }

  removeImages(i: number) {
    this.product.productImages.splice(i, 1);
  }

  fileDropped(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileHandel: FileHandel = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
          type: '',
          picByte: ''
        };
        this.product.productImages.push(fileHandel);
      }
    }
  }
  
}