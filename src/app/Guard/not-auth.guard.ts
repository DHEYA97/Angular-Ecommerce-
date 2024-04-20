import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const notAuthGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router)
  let _AuthService = inject(AuthService)
  let isLogin : boolean = false
  _AuthService.userData.subscribe(
    {
      next:(data)=>{
        if(data!=null)
        isLogin = true
      }
    }
  )
  if(isLogin == false)
  {
    _Router.navigate(['/auth/singin'])
    return false
  }
  else
  {
    return true
  }
};
