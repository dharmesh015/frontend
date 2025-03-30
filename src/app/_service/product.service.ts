import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

 
  private baseUrl = 'http://localhost:9090';

  public addProduct(product: FormData){
    console.log("in service"+product);
    return this.httpClient.post<Product>("http://localhost:9090/addNewProduct", product);
  }

  updateProduct(product:FormData ) {
    console.log("in service",product);
    return this.httpClient.post<Product>("http://localhost:9090/updateProduct",product);
  }
  
  getAllProducts(): Observable<Product[]> {
    console.log("in service");
    return this.httpClient.get<Product[]>("http://localhost:9090/getAllProducts");
  }

  deleteProduct(productId: number): any {
    console.log("service" + productId);
    return this.httpClient.delete("http://localhost:9090/deleteProduct/" + productId);
}

// updateProduct(productId: number, productData: any): Observable<Product> {
//   console.log("update service"+productData);
//   return this.httpClient.put<Product>(`${this.apiUrl}/products/${productId}`, productData);
// }
getProductById(id: number): Observable<Product> {
  return this.httpClient.get<Product>(`${this.baseUrl}/getProductById/${id}`);
}


getProductDetails(isSingeProductCheckout:boolean,productId: number){
  console.log(productId);
  return this.httpClient.get<Product[]>(`${this.baseUrl}/getProductDetails/${isSingeProductCheckout}/${productId}`);
}


public placeOrder(orderDetails: OrderDetails){
  console.log(orderDetails);
  return this.httpClient.post("http://localhost:9090/placeOrder",orderDetails);
 }
}
