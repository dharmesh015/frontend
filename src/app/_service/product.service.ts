import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { Cart } from '../modul/cart';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = 'http://localhost:9090';

  public addProduct(product: FormData) {
    console.log('in service' + product);
    return this.httpClient.post<Product>(
      'http://localhost:9090/addNewProduct',
      product
    );
  }

  updateProduct(product: FormData) {
    console.log('in service', product);
    return this.httpClient.post<Product>(
      'http://localhost:9090/updateProduct',
      product
    );
  }
 
  getAllProducts(): Observable<Product[]> {
    console.log('in service');
    return this.httpClient.get<Product[]>(
      'http://localhost:9090/getAllProducts'
    );
  }

  deleteProduct(productId: number): any {
    console.log('service' + productId);
    return this.httpClient.delete(
      'http://localhost:9090/deleteProduct/' + productId
    );
  }

public getProductById(id: number): Observable<Product> {
  return this.httpClient.get<Product>(`${this.baseUrl}/getProductById/${id}`);
}

public getProductDetails(isSingleProductCheckout: boolean, productId: number): Observable<any> {
  return this.httpClient.get(`${this.baseUrl}/getProductDetails/${isSingleProductCheckout}/${productId}`);
}

public placeOrder(orderDetails: OrderDetails, isSingleProductCheckout: boolean): Observable<any> {
  return this.httpClient.post(`${this.baseUrl}/placeOrder/${isSingleProductCheckout}`, orderDetails);
}

  getAllProductsPageWise(
    page: number,
    size: number,
    sortBy: string,
    sortDir: string
  ): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/getAllProductsPageWise?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
  }

  getOrderDetails(
    username: string,
    page: number,
    size: number,
    sortBy: string,
    sortDir: string
  ): Observable<any> {
    console.log('user name -' + username);
    // Set up HTTP request parameters
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    // Make the GET request
    return this.httpClient.get(`${this.baseUrl}/getorderdetails/${username}`, {
      params,
    });
  }

  getproductdetails(
    username: string,
    page: number,
    size: number,
    sortBy: string,
    sortDir: string
  ): Observable<any> {
    console.log('user name -' + username);
    // Set up HTTP request parameters
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    // Make the GET request
    return this.httpClient.get(`${this.baseUrl}/getproduct/${username}`, {
      params,
    });
  }

  uploadUserImage(userName: string, imageFile: File): Observable<any> {
    console.log('here service');
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('imageFile', imageFile);

    return this.httpClient.post(`${this.baseUrl}/upload-image`, formData);
  }

  getUserImage(userName: string): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/image/${userName}`, {
      responseType: 'blob',
    });
  }

public addToCart(productId: number): Observable<Cart> {
  console.log("add cart service")
  return this.httpClient.get<Cart>(`${this.baseUrl}/addToCart/${productId}`);
}

  
public getCartDetails(): Observable<Cart[]> {
  return this.httpClient.get<Cart[]>(`${this.baseUrl}/getCartDetails`);
}

public deleteCartItem(cartId: number): Observable<any> {
  return this.httpClient.delete(`${this.baseUrl}/deleteCartItem/${cartId}`);
}

}
