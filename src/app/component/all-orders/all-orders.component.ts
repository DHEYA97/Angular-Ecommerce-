import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
allOrderList:any[] = []
UserId:any = "" 
  constructor(private _OrderService:OrderService,private _AuthService:AuthService){}
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
      this.allOrderList = value
      console.log(value);
    },
  })
}
}
