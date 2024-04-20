import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss']
})
export class SinginComponent {
  constructor(private _AuthService:AuthService,private _Router:Router,private _CartService:CartService){
  }
  loadSingin : boolean = false;
  ErrorMessage : string = ""
  LoginForm : FormGroup = new FormGroup(
    {
      email : new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null ,[Validators.required,Validators.pattern('^([A-Z]{1,3}[a-z]{2,5})[0-9]{2,}')]),
    })

Login(LoginForm:FormGroup)
{
  this.loadSingin = true
  console.log(LoginForm.value);
  
  this._AuthService.Singin(LoginForm.value).subscribe({
    next: (value) => {
      if(value.message == "success")
      {
        localStorage.setItem("registerData",value.token)
        this._AuthService.decode()
        location.href = location.origin;
      }
    },
    error: (err) => {
      this.ErrorMessage = err.error.message
    },
  })
  this.loadSingin = false
}
}