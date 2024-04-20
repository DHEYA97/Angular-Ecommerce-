import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  headers:any = {
    token:localStorage.getItem('registerData')
  }
  constructor(private _HttpClient:HttpClient) 
  {

  }
  CreateCashOrder(orderId:string,shippingAddress:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${orderId}`,
    {
      "shippingAddress" : shippingAddress
    },
    {
      headers:this.headers
    }
    )
  }
  CreateOnLineOrder(orderId:string,shippingAddress:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${orderId}?url=http://localhost:4200`,
    {
      "shippingAddress" : shippingAddress
    },
    {
      headers:this.headers
    }
    )
  }
  getUserOrder(userId:string):Observable<any>
  {
    // 6407cf6f515bdcf347c09f17
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  }
}
