import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userData = new BehaviorSubject(null)
resetpass = new BehaviorSubject(null)
constructor(private _HttpClient:HttpClient,private _Router:Router)
  {
    this.decode()
  }
  decode()
  {
    if(localStorage.getItem("registerData"))
    {
      let coded : any = localStorage.getItem("registerData")
      let decode : any =  jwtDecode(coded);
      this.userData.next(decode)      
    }
  }

  Singup(faormData:any):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,faormData);
  }

  Singin(faormData:any):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,faormData);
  }

  logout()
  {
    localStorage.removeItem("registerData")
    this.userData.next(null)
    this._Router.navigate(['/auth/singin'])
  }

  forgetPassword(faormData:any):Observable<any>{
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,faormData);
}

verifyCode(faormData:any):Observable<any>{
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,faormData);
}

resetPassword(faormData:any):Observable<any>{
  return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,faormData);
}
}
