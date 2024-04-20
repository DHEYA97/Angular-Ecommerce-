import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {
  constructor(private _AuthService:AuthService,private _Router:Router){
  }
  Email:any = ""
  ErrorMessage : string = ""
  repasswordForm : FormGroup = new FormGroup(
    {
      email:new FormControl(this.Email),
      newPassword : new FormControl(null ,[Validators.required,Validators.pattern('^([A-Z]{1,3}[a-z]{2,5})[0-9]{2,}')]),
      reNewPassword : new FormControl(null ,[Validators.required,Validators.pattern('^([A-Z]{1,3}[a-z]{2,5})[0-9]{2,}')]),
    },{validators:this.repasswordmach})
  
  repasswordmach(registerForm:any)
  {
    let newPassword = registerForm.get("newPassword")
    let reNewPassword = registerForm.get("reNewPassword")
    if(newPassword?.value === reNewPassword?.value)
    {
      return null
    }
    else
    {
      reNewPassword.setErrors({rePasswordNotMached:"repassowred Not Matched"})
      return {rePasswordNotMached:"repassowred Not Matched"}
    }
  }
  Repassword(repasswordForm:FormGroup)
  {
    this._AuthService.resetpass.subscribe({
      next:(email)=>
      {
        repasswordForm.get("email")?.setValue(email)
      }
    })
    console.log(repasswordForm.value); 
    this._AuthService.resetPassword(repasswordForm.value).subscribe({
      next: (value) => {
        console.log(value);
        if(value.token)
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
    
  }
}
