import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl:string=`https://ecommerce.routemisr.com`
  CarttotalNumber = new  BehaviorSubject(0);  
headers:any = {
  token:localStorage.getItem('registerData')
}
  constructor(private _HttpClient:HttpClient) {
    this.Get_Logged_user_cart().subscribe(
      {
        next:(value)=> {
          this.CarttotalNumber.next(value.numOfCartItems)          
        },
        error(err) {
          console.log("err : " , err);
        },
      }
    )
  }
  addToCart(id:string):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',
    {
      productId:id
    },
    {
      headers:this.headers
    }
    )
  }
  Get_Logged_user_cart():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`,
    {
      headers:this.headers
    }
    )
  }
  RemoveSpecificCartItem(Id:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${Id}`,
    {
      headers:this.headers
    }
    )
  }
  RemoveAllCartItem():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers:this.headers
    }
    )
  }

UpdateSpecificCartItem(Id:string,count:string):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${Id}`,
    {
      count:count
    },
    {
      headers:this.headers
    }
    )
  }
}