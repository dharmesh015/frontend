import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  private baseUrl = 'http://localhost:9090'; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  getOrdersBySeller(sellerName: string):Observable<MyOrderDetails[]> {
    return this.http.get<MyOrderDetails[]>(`${this.baseUrl}/seller/${sellerName}`);
  }
}
