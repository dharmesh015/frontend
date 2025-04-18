import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileHandel } from '../_model/file-handel.model';
import { ProductService } from '../_service/product.service';
import { Console } from 'node:console';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';
import { Product } from '../_model/product.model';
import { UserAuthServiceService } from '../_service/user-auth-service.service';

@Component({
  selector: 'app-add-new-product',
  standalone: false,
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css'],
})
export class AddNewProductComponent implements OnInit {
  isNewProduct = true;
  product: Product = {
    productId: 0,
    productName: '',
    productDescription: '',
    productDiscountedPrice: 0,
    productActualPrice: 0,
    sellername: '',
    productImages: [],
  };

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private authservice: UserAuthServiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.product.sellername = this.authservice.getUser().userName;
    const productData = this.activatedRoute.snapshot.data['product'];
    if (productData) {
      this.product = productData;
      this.isNewProduct = false;
    }
  }

  addProduct(productForm: NgForm) {
    if (productForm.value.productName === '') {
      Swal.fire({
        title: 'Incomplete Product Data',
        text: ' product name  is not provide.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }
    if (productForm.value.productDescription === '') {
      Swal.fire({
        title: 'Incomplete Product Data',
        text: 'product Description  is not provide.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (
      productForm.value.productDiscountedPrice === 0 ||
      productForm.value.productActualPrice === 0
    ) {
      Swal.fire({
        title: 'Incomplete Product Data',
        text: ' Price values cannot be 0.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (this.product.productImages.length === 0) {
      Swal.fire({
        title: 'No Images Provided',
        text: 'Please upload at least one image for the product.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }



    const productFormData = this.prepareFormData(this.product);
  
    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        productForm.reset();
        this.product.productImages = [];
        Swal.fire({
          title: 'Product Added',
          text: 'The product has been successfully added.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while adding the product. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    for (let i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return formData;
  }
  
  onFileSelected(event: any) {
    if (event.target.files) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (isPlatformBrowser(this.platformId)) {
          const fileHandel: FileHandel = {
            file: file,
            url: this.sanitizer.bypassSecurityTrustUrl(
              window.URL.createObjectURL(file)
            ),
            type: '',
            picByte: '',
          };
          this.product.productImages.push(fileHandel);
        } else {
          console.log('Cannot create object URL as window is not defined.');
        }
      }
    }
  }

  removeImages(i: number) {
    this.product.productImages.splice(i, 1);
  }
}
