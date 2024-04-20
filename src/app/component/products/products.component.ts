import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  productesList:any[] = []
  searchValue:string = ''
  constructor(private _GetdataService:GetdataService,private _CartService :CartService,private _WishlistService:WishlistService){
    console.log(localStorage.getItem('registerData'));
    
      _CartService.Get_Logged_user_cart().subscribe({
      next(value) {
        console.log(value);
      },
    })
    
    }
      ngOnInit(): void {
        this.getProductsData()
      }
    
    getProductsData()
    {
      this._GetdataService.getData(this._GetdataService.baseUrl,"products").subscribe((data)=>{
      this.productesList = data.data
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
    addToWishList(productId:string)
    {
      this._WishlistService.add_ProductToTishlist(productId).subscribe({
        next:(response)=> {
          (response.status == "success")
          {
            Swal.fire({
              icon: 'success',
              title: 'Add to WishList successfully',
              text: response.message,
            })
            this._WishlistService.Get_logged_user_wishlist().subscribe(
              {
                next:(value)=> {
                  this._WishlistService.WishlisttotalNumber.next(value.count)
                },
                error(err) {
                  console.log("err : " , err);
                },
              }
            )  
          }
        },
        error:(err)=> {
          console.log(err);
        },
      })
    }
    }