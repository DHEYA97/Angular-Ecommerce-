import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {
constructor(private _AuthService : AuthService,private _Router:Router){

}
errorMessage:string = ""
FormTitle:string = "Forget Password"
ShowForgetPassword :boolean = true
ShowVerifyResetCode :boolean = false
forgetPasword : FormGroup = new FormGroup(
  {
    email : new FormControl(null,[Validators.required,Validators.email])
  }
)
verifyResetCode : FormGroup = new FormGroup(
  {
    resetCode : new FormControl(null,[Validators.required])
  }
)
SendforgetPasword(form : any)
{
  console.log(form.value);
  this._AuthService.forgetPassword(form.value).subscribe(
    {
      next :(response)=>{
        console.log(response);
        if(response.statusMsg=="success")
        {
          this._AuthService.resetpass.next(form.get('email').value)
          console.log(this._AuthService.resetpass.value);
          this.errorMessage = ""
          this.FormTitle = "Verify Reset Code"
          this.ShowForgetPassword = false
          this.ShowVerifyResetCode = true
        }
      },
      error :(err)=>{
        this.errorMessage = err.error.message;
      }
    }
  ) 
}
SendVerifyCode(form : any)
{
  console.log(form.value);
  this._AuthService.verifyCode(form.value).subscribe(
    {
      next :(response)=>{
        // console.log(response);
        if(response.status=="Success")
        {
          this._Router.navigate(['/auth/resetpassword'])
        }
      },
      error :(err)=>{
        this.errorMessage = err.error.message;
      }
    }
  ) 
}
}