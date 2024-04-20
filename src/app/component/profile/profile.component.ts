import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  UserData:any = ""
  constructor(private _WishlistService:WishlistService,private _AuthService:AuthService,private _CartService:CartService){
  }

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next : (value)=> {
        this.UserData = value
      },
    })
  }
  Logout()
  {
    this._CartService.CarttotalNumber.next(0)
    this._WishlistService.WishlisttotalNumber.next(0)
    this._AuthService.logout()
  }
}
