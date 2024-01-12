import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  [x: string]: any;

  constructor(private http:HttpClient) { }

  create(order:Order){
    alert(order.name);

    return this.http.post<Order>('https://secure-delivery-app-three.vercel.app/orders/create',order);
  }
  getNewOrderForCurrentUser():Observable<Order>{
    return this.http.get<Order>('https://secure-delivery-app-three.vercel.app/orders/newOrderFromCurrentUser');
  }

  pay(order:Order):Observable<string>{
    return this.http.post<string>('https://secure-delivery-app-three.vercel.app/pay',order);
  }

  getAllOrders():Observable<Order[]>{
    return this.http.get<Order[]>('https://secure-delivery-app-three.vercel.app/orders');
  }

}
