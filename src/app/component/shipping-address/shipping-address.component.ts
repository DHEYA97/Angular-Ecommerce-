import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent implements OnInit,OnDestroy{
  Method:any = ""
  cartId:any=""
  orderId:any=""
  thinkYouPage:boolean = false
  time:number = 5
  Interval:any
  constructor(private _ActivatedRoute:ActivatedRoute,private _OrderService:OrderService,private _Router:Router,private _CartService:CartService){
    _ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        if(param.get("method") == "cash" || param.get("method") == "online")
        {
          this.Method = param.get("method")
        }
        else
        {
          this._Router.navigate(['/home'])
        }
      }
    })
  }
  ngOnInit(): void {
    this._CartService.Get_Logged_user_cart().subscribe({
      next:(value)=>
      {
        this.cartId = value.data._id          
      },
    })
  }
  ngOnDestroy(): void {
    clearInterval(this.Interval)
  }
  
  ErrorMessage:string = ""
  ShippingAddressForm : FormGroup = new FormGroup(
    {
      details : new FormControl(null,[Validators.required]),
      phone : new FormControl(null ,[Validators.required,Validators.pattern("^(00201|\\+201|01)[0-2,5]{1}[0-9]{8}$")]),
      city : new FormControl(null,[Validators.required]),
    })
    makeOrder(ShippingAddressForm : FormGroup ){
      if(this.Method == "cash")
      {
        this.cashOrder(ShippingAddressForm)
      }
      else if(this.Method == "online")
      {
        this.onlineOrder(ShippingAddressForm)
      }
    }
    cashOrder( ShippingAddressForm : FormGroup ){
      this._OrderService.CreateCashOrder(this.cartId,ShippingAddressForm.value).subscribe({
        next:(value)=> {
          if(value.status == "success")
          {
            this._CartService.CarttotalNumber.next(0)
            this.orderId = value.data.id
            this.thinkYouPage = true
            this.Interval = setInterval(()=>{
              this.time --
              if(this.time <= 0)
              {
                this._Router.navigate(["/home"])
              }
            },1000)
          }
        },
        error:(err)=>{
          this.thinkYouPage = false
          console.log(err);         
        },
      })
    }
  onlineOrder(ShippingAddressForm: FormGroup)
  {
    this._OrderService.CreateOnLineOrder(this.cartId,ShippingAddressForm.value).subscribe({
      next:(value)=> {
        if(value.status == "success")
        {
          console.log(value);
          location.href = value.session.url
        }
      },
      error:(err)=>{
        this.thinkYouPage = false
        console.log(err);         
      },
    })
  }
}


