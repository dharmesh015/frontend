import { Component, OnInit } from '@angular/core';
import { Registrationuser } from '../modul/registrationuser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profilepage',
  standalone: false,
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css'
})
export class ProfilepageComponent implements OnInit {

  userData: Registrationuser = new Registrationuser("","","","","","");
  // productId!: number;
  // mainImageIndex: number = 0; // Track which image is currently shown as the main image

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
       const userData= this.userService.getuser().subscribe(

          (response: Registrationuser) => {
                      console.log(response)
          }
        );
  }
  // isNewProduct = true;

  // updateProduct(productForm: NgForm) {
  //   console.log(productForm);
  //   if (productForm.value.productName === '') {
  //     Swal.fire({
  //       title: 'Incomplete Product Data',
  //       text: ' product name  is not provide.',
  //       icon: 'warning',
  //       confirmButtonText: 'OK',
  //     });
  //     return;
  //   }
  //   if (productForm.value.productDescription === '') {
  //     Swal.fire({
  //       title: 'Incomplete Product Data',
  //       text: 'product Description  is not provide.',
  //       icon: 'warning',
  //       confirmButtonText: 'OK',
  //     });
  //     return;
  //   }

  //   if (
  //     productForm.value.productDiscountedPrice === 0 ||
  //     productForm.value.productActualPrice === 0
  //   ) {
  //     Swal.fire({
  //       title: 'Incomplete Product Data',
  //       text: ' Price values cannot be 0.',
  //       icon: 'warning',
  //       confirmButtonText: 'OK',
  //     });
  //     return;
  //   }

  //   if (this.product.productImages.length === 0) {
  //     Swal.fire({
  //       title: 'No Images Provided',
  //       text: 'Please upload at least one image for the product.',
  //       icon: 'warning',
  //       confirmButtonText: 'OK',
  //     });
  //     return;
  //   }
  //   const productFormData = this.prepareFormData(this.product);
  //   console.log(productFormData);

  //   this.productService.updateProduct(productFormData).subscribe(
  //     (response: Product) => {
  //       productForm.reset();
  //       this.product.productImages = [];
  //       Swal.fire({
  //         title: 'Product updated',
  //         text: 'The product has been successfully updated.',
  //         icon: 'success',
  //         confirmButtonText: 'OK',
  //       });
        
  //       this.router.navigate(['/admin'])
  //       // window.location.reload();
  //     },
  //     (error: any) => {
  //       Swal.fire({
  //         title: 'Error',
  //         text: 'An error occurred while adding the product. Please try again.',
  //         icon: 'error',
  //         confirmButtonText: 'OK',
  //       });
  //     }
  //   );
  // }

  // prepareFormData(product: Product): FormData {
  //   const formData = new FormData();
  //   formData.append(
  //     'product',
  //     new Blob([JSON.stringify(product)], { type: 'application/json' })
  //   );

  //   // for (let i = 0; i < product.productImages.length; i++) {
  //   //   formData.append('imageFile', product.productImages[i].file, product.productImages[i].file.name);
  //   // }

  //   return formData;
  // }

  // onFileSelected(event: any) {
  //   if (event.target.files) {
  //     const files = event.target.files;
  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];
  //       const fileHandel: FileHandel = {
  //         file: file,
  //         url: this.sanitizer.bypassSecurityTrustUrl(
  //           window.URL.createObjectURL(file)
  //         ),
  //         type: '',
  //         picByte: '',
  //       };
  //       this.product.productImages.push(fileHandel);
  //     }
  //   }
  // }

  // removeImages(i: number) {
  //   this.product.productImages.splice(i, 1);
  // }

  // fileDropped(event: DragEvent) {
  //   event.preventDefault();
  //   const files = event.dataTransfer?.files;
  //   if (files) {
  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];
  //       const fileHandel: FileHandel = {
  //         file: file,
  //         url: this.sanitizer.bypassSecurityTrustUrl(
  //           window.URL.createObjectURL(file)
  //         ),
  //         type: '',
  //         picByte: '',
  //       };
  //       this.product.productImages.push(fileHandel);
  //     }
  //   }
  // }

  // getProductDetails(id: number): void {
  //   this.productService.getProductById(id).subscribe(
  //     (data: Product) => {
  //       this.product = data;
  //       // Transform images like in home component
  //       this.product.productImages = this.product.productImages.map((image) => {
  //         return {
  //           ...image,
  //           url: `data:${image.type};base64,${image.picByte}`,
  //         };
  //       });
  //     },
  //     (error: any) => {
  //       console.error('Error fetching product details:', error);
  //     }
  //   );
  // }
}
