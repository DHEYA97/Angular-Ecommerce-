import { Component } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { GetdataService } from 'src/app/services/getdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detailes',
  templateUrl: './product-detailes.component.html',
  styleUrls: ['./product-detailes.component.scss']
})
export class ProductDetailesComponent {
productId : any = ""
productData : any = ""
ErroreMessage : string = ""
constructor(private _ActivatedRoute:ActivatedRoute,private _GetdataService:GetdataService,private _Router:Router,private _CartService:CartService){
  _ActivatedRoute.paramMap.subscribe({
    next : (param) =>  {
      this.productId = param.get('id')
    },
  })
  this.getProductData()
}
getProductData()
{
  this._GetdataService.getData(this._GetdataService.baseUrl,`products/${this.productId}`).subscribe({
    next:(data)=>{
      if(data != null)
      {
        console.log(data.data);
        this.productData = data.data
      }
    },
    error:(error)=>{
      this.ErroreMessage = error.error.errors.msg
      setTimeout(() => {
        this._Router.navigate(['/home'])
      }, 2000);
      
      
    }
  })
}
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
  },
  nav: true
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
}
