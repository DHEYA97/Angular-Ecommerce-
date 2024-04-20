import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { GetdataService } from 'src/app/services/getdata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cateogory-productes',
  templateUrl: './cateogory-productes.component.html',
  styleUrls: ['./cateogory-productes.component.scss']
})
export class CateogoryProductesComponent implements OnInit {
  productesList:any[] = []
  catId:any = ""
  catname:any = ""
  constructor(private _GetdataService:GetdataService,private _ActivatedRoute:ActivatedRoute,private _CartService :CartService){
    _ActivatedRoute.paramMap.subscribe({
      next : (param) =>  {
        this.catId = param.get('catId')
      },
    })
    console.log(this.catId);
  }
  ngOnInit(): void {
    this.getProductsData()
    console.log((this.catname));
  }
  
  getProductsData()
  {
    this._GetdataService.getData(this._GetdataService.baseUrl,"products").subscribe((data)=>{
    this.productesList = data.data.filter((e:any)=>
    {
      if(e.category._id==this.catId)
      this.catname = e.category.name
      return e.category._id==this.catId
    })
  })
}
addtocart(productId:string)
{
  this._CartService.addToCart(productId).subscribe({
    next:(response)=>{
      if(response.status == "success")
      {
        Swal.fire({
          icon: 'success',
          title: 'Add to cart successfully',
          text: response.message,
        })
        this._CartService.Get_Logged_user_cart().subscribe(
          {
            next:(value)=> {
              this._CartService.CarttotalNumber.next(value.numOfCartItems)
            },
            error(err) {
              console.log("err : " , err);
            },
          }
        )
        console.log("add : " , response.numOfCartItems);    
      }
    },
    error:(err)=>{
      console.log(err);  
    }
  })  
}
}
