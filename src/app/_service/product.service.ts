import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

 

  apiUrl="http://localhost:9090/addNewProduct"

  public addProduct(product: FormData){
    console.log("in service"+product);
    return this.httpClient.post<Product>("http://localhost:9090/addNewProduct", product);
  }

  
  getAllProducts(): Observable<Product[]> {
    console.log("in service");
    return this.httpClient.get<Product[]>("http://localhost:9090/getAllProducts");
  }

  deleteProduct(productId: number): Observable<any> {
    console.log("service");
    return this.httpClient.delete(`${this.apiUrl}/deleteProduct/${productId}`);
  }
}
