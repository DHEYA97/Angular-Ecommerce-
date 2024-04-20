import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetdataService {
  baseUrl:string = "https://ecommerce.routemisr.com/api/v1/"
  constructor(private _HttpClient:HttpClient) { }
  getData(url:string,selectedData:string):Observable<any>
  {
    return this._HttpClient.get(url+selectedData)
  }
}
