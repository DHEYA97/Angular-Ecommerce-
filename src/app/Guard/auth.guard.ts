import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router)
  let _AuthService = inject(AuthService)
  let isLogin : boolean = true
  _AuthService.userData.subscribe(
    {
      next:(data)=>{
        if(data!=null)
        isLogin = false
      }
    }
  )
  if(isLogin == true)
  {
    return true
  }
  else
  {
    _Router.navigate(['/home'])
    return false
  }
};
