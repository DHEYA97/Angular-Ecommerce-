import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  Wishlist:any[] = []
  wishListNumber = new BehaviorSubject(0)
  constructor(private _WishlistService:WishlistService,private _CartService:CartService){}
  ngOnInit(): void {
    this.getAllWishlist()
  }
getAllWishlist()
{
  this._WishlistService.Get_logged_user_wishlist().subscribe({
    next:(value)=> {
      this._WishlistService.WishlisttotalNumber.next(value.count)
      this.wishListNumber.next(value.count)
      this.Wishlist = value.data
      console.log(value);
    },
  })
}
addtocart(productId:string)
{
  this._CartService.addToCart(productId).subscribe({
    next:(response)=>{
      if(response.status == "success")
      {
        Swal.fire({
          icon: 'success',
          title: 'Add to cart successfully',
          text: response.message,
        })
        this._CartService.Get_Logged_user_cart().subscribe(
          {
            next:(value)=> {
              this._CartService.CarttotalNumber.next(value.numOfCartItems)
            },
            error(err) {
              console.log("err : " , err);
            },
          }
        )
        console.log("add : " , response.numOfCartItems);    
      }
    },
    error:(err)=>{
      console.log(err);  
    }
  })  
}
removeItemFromWishlist(productId:string)
{
  this._WishlistService.removeItemFromWishlist(productId).subscribe({
    next:(value)=> {
      this.getAllWishlist()
      console.log(value);
    },
  })
}
}