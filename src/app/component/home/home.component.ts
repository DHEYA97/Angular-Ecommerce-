import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categoresList:any[] = []
  brandsList:any[] = []
  productesList:any[] = []
constructor(private _GetdataService:GetdataService,private _CartService :CartService,private _WishlistService:WishlistService){
  _CartService.Get_Logged_user_cart().subscribe({
  next(value) {
    console.log(value);
  },
})

}
  ngOnInit(): void {
    this.getCategoresData()
    this.getBrandsData()
    this.getProductsData()
  }
getCategoresData()
{
  this._GetdataService.getData(this._GetdataService.baseUrl,"categories").subscribe((data)=>{
  this.categoresList = data.data.splice(0,5)
})
}
getBrandsData()
{
  this._GetdataService.getData(this._GetdataService.baseUrl,"brands").subscribe((data)=>{
  this.brandsList = data.data.splice(0,5)
})
}
getProductsData()
{
  this._GetdataService.getData(this._GetdataService.baseUrl,"products").subscribe((data)=>{
  this.productesList = data.data.splice(0,5)
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
addToWishList(productId:string)
{
  this._WishlistService.add_ProductToTishlist(productId).subscribe({
    next:(response)=> {
      (response.status == "success")
      {
        Swal.fire({
          icon: 'success',
          title: 'Add to WishList successfully',
          text: response.message,
        })
        this._WishlistService.Get_logged_user_wishlist().subscribe(
          {
            next:(value)=> {
              this._WishlistService.WishlisttotalNumber.next(value.count)
            },
            error(err) {
              console.log("err : " , err);
            },
          }
        )  
      }
    },
    error:(err)=> {
      console.log(err);
    },
  })
}
}