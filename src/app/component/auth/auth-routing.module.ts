import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/Guard/auth.guard';
import { resetpassGuard } from 'src/app/Guard/resetpass.guard';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SinginComponent } from './singin/singin.component';
import { SingupComponent } from './singup/singup.component';
import { AuthComponent } from './auth/auth/auth.component';

const routes: Routes = [
  {path:'',component:AuthComponent,children:[
    {path:'singin',canActivate:[authGuard],component:SinginComponent},
    {path:'singup',canActivate:[authGuard],component:SingupComponent},
    {path:'forgetpassword',component:ForgetpasswordComponent},
    {path:'resetpassword',canActivate:[resetpassGuard],component:ResetpasswordComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }