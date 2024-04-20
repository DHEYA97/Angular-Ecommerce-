import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent {
constructor(private _AuthService:AuthService,private _Router:Router){
}
loadSingup : boolean = false;
ErrorMessage : string = ""
registerForm : FormGroup = new FormGroup(
  {
    name : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    email : new FormControl(null,[Validators.required,Validators.email]),
    password : new FormControl(null ,[Validators.required,Validators.pattern('^([A-Z]{1,3}[a-z]{2,5})[0-9]{2,}')]),
    rePassword : new FormControl(null ,[Validators.required,Validators.pattern('^([A-Z]{1,3}[a-z]{2,5})[0-9]{2,}')]),
    phone : new FormControl(null ,[Validators.required,Validators.pattern("^(00201|\\+201|01)[0-2,5]{1}[0-9]{8}$")]),
  },{validators:this.repasswordmach})

  repasswordmach(registerForm:any)
{
  let password = registerForm.get("password")
  let rePassword = registerForm.get("rePassword")
  if(password?.value === rePassword?.value)
  {
    return null
  }
  else
  {
    rePassword.setErrors({rePasswordNotMached:"repassowred Not Matched"})
    return {rePasswordNotMached:"repassowred Not Matched"}
  }
}
Register(registerForm:FormGroup)
{
  this.loadSingup = true
  this._AuthService.Singup(registerForm.value).subscribe({
    next: (value) => {
      if(value.message == "success")
      {
        localStorage.setItem("registerData",value.token)
        this._AuthService.decode()
        this._Router.navigate(['./home'])
      }
    },
    error: (err) => {
      this.ErrorMessage = err.error.message
    },
  })
  this.loadSingup = false
}
}