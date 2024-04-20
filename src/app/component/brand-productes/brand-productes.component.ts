import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { GetdataService } from 'src/app/services/getdata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand-productes',
  templateUrl: './brand-productes.component.html',
  styleUrls: ['./brand-productes.component.scss']
})
export class BrandProductesComponent implements OnInit {
  productesList:any[] = []
  brandId:any = ""
  brandname:any = ""
  constructor(private _GetdataService:GetdataService,private _ActivatedRoute:ActivatedRoute,private _CartService:CartService){
    _ActivatedRoute.paramMap.subscribe({
      next : (param) =>  {
        this.brandId = param.get('brandId')
      },
    })
    console.log(this.brandId);
  }
  ngOnInit(): void {
    this.getProductsData()
    console.log((this.brandname));
  }
  
  getProductsData()
  {
    this._GetdataService.getData(this._GetdataService.baseUrl,"products").subscribe((data)=>{
    this.productesList = data.data.filter((e:any)=>
    {
      if(e.brand._id==this.brandId)
      this.brandname = e.brand.name
      return e.brand._id==this.brandId
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