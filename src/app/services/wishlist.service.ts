import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

constructor(private _HttpClient:HttpClient) {
    this.Get_logged_user_wishlist().subscribe({
      next:(value)=> {
        this.WishlisttotalNumber.next(value.count)
      },
    })
  }
  WishlisttotalNumber = new  BehaviorSubject(0);  
headers:any = {
  token:localStorage.getItem('registerData')
}
Get_logged_user_wishlist():Observable<any>
{
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
  {
    headers:this.headers
  })
}
add_ProductToTishlist(productId:string):Observable<any>
{
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
  {
    productId:productId
  },
  {
    headers:this.headers
  }
  )
}
removeItemFromWishlist(productId:string):Observable<any>
{
  return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
  {
    headers:this.headers
  }
  )
}
}