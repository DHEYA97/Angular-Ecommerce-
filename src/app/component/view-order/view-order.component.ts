import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  allOrderList:any[] = []
  UserId:any = "" 
  orderId :any = "" 
constructor(private _OrderService:OrderService,private _ActivatedRoute:ActivatedRoute,private _AuthService:AuthService){
  _ActivatedRoute.paramMap.subscribe({
    next:(param)=> {
      this.orderId = param.get("orderId");
    },
  })
}
ngOnInit(): void {
  this._AuthService.userData.subscribe({
    next : (value)=> {
      this.UserId = value
    },
  })
  this.getAllUserOrder(this.UserId.id);
}
getAllUserOrder(userId:string){
this._OrderService.getUserOrder(userId).subscribe({
  next : (value)=> {
    this.allOrderList = this.filterOrder(value)
    console.log(this.allOrderList);
  },
})
}
filterOrder(value:any[]):any[]
{
  return value.filter((e)=>e.id==this.orderId)
}
}