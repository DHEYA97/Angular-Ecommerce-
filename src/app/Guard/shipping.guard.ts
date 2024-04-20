import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

export const shippingGuard: CanActivateFn =  (route, state) => {

  let _CartService = inject(CartService)
  let _Router = inject(Router)

    _CartService.Get_Logged_user_cart().subscribe(
      {
        next:(response)=>{
          console.log("Gurd 1 : " , _CartService.CarttotalNumber.value);
          _CartService.CarttotalNumber.next(response.numOfCartItems)
        }
      }
    )
    console.log("Gurd 2 : " , _CartService.CarttotalNumber.value);

  if(_CartService.CarttotalNumber.value <=0)
  {
    _Router.navigate(['/home'])
    return false
  }
  else
  {
    return true
  }
};
