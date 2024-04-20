import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const resetpassGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router)
  let _AuthService = inject(AuthService)
  let isresetable:any
  _AuthService.resetpass.subscribe({
    next:(r)=>{
      isresetable = r
    }
  })
if(isresetable != null)
  return true;
else
{
  _Router.navigate(['/auth/singin'])
  return false
}
};
