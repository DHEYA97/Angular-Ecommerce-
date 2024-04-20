import {  Component, ElementRef,  HostListener,  ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  isLogin : boolean = false
  CarttotalNumber = new BehaviorSubject(0)
  WishlisttotalNumber = new BehaviorSubject(0)

  @ViewChild('navbar')navBar !: ElementRef;

  @HostListener('window:scroll') 
  onWindowScroll() {
    if(scrollY > 70){
      this.navBar.nativeElement.classList.add("w-100")
      this.navBar.nativeElement.classList.add("fixed-top")
      this.navBar.nativeElement.classList.replace("py-1","py-2")
    }else{
      this.navBar.nativeElement.classList.remove("w-100")
      this.navBar.nativeElement.classList.remove("fixed-top")
      this.navBar.nativeElement.classList.replace("py-2","py-1")
    }
  }
constructor(private _WishlistService:WishlistService,private _AuthService:AuthService,private _CartService:CartService){
  _CartService.CarttotalNumber.subscribe(
    {
      next:(value)=>
      {
        this.CarttotalNumber.next(value)
      }
    })

    _WishlistService.WishlisttotalNumber.subscribe({
      next:(value)=> {
        this.WishlisttotalNumber.next(value)
      },
    })
    
  _AuthService.decode()
  _AuthService.userData.subscribe(
    {
      next:()=>{
        if(_AuthService.userData.getValue() !== null)
        {
          this.isLogin = true
        }
        else
        {
          this.isLogin = false
        }
      }
    }
  )
}
  
logout()
{
  this._CartService.CarttotalNumber.next(0)
  this._WishlistService.WishlisttotalNumber.next(0)
  this._AuthService.logout()
}
}