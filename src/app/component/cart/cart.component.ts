import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
constructor(private _CartService : CartService){
}
  ngOnInit(): void {
    this.getItemCart()
  }
itemcart:any
totalCartPrice:string = ""
cartId:string = ""
getItemCart()
{
  this._CartService.Get_Logged_user_cart().subscribe({
    next:(response)=>
    {
      if(response.status == "success")
      {
        this.cartId = response.data._id
        this.itemcart = response.data.products
        this.totalCartPrice = response.data.totalCartPrice
        this._CartService.CarttotalNumber.next(response.numOfCartItems)
        console.log(response.data.products);
        
      }
      else{
        console.log("not found");
        
      }
    }
  })
}
RemoveSpecificItemCart(productId:string)
{
  this._CartService.RemoveSpecificCartItem(productId).subscribe(
    {
      next:(response)=> {                
          console.log(response);
          this.getItemCart()
      },
      error:(error)=> {
        console.log(error);
      },
    }
  )
}
RemoveAllItemCart()
{
  this._CartService.RemoveAllCartItem().subscribe(
    {
      next:(response)=> {                
          console.log(response);
          if(response.message == "success")
          {
            this.itemcart = null
            this._CartService.CarttotalNumber.next(0)
          }
          
      },
      error:(error)=> {
        console.log(error);
      },
    }
  )
}
UpdateItemCart(ProductId:string,ProductCount:string)
{
  this._CartService.UpdateSpecificCartItem(ProductId,ProductCount).subscribe({
    next:(response)=> {                
      console.log(response);
      this.getItemCart()
  },
  error:(error)=> {
    console.log(error);
  },
  })
}
}