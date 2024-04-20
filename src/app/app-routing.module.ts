import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { BrandComponent } from './component/brand/brand.component';
import { CartComponent } from './component/cart/cart.component';
import { CategoryComponent } from './component/category/category.component';
import { ProductsComponent } from './component/products/products.component';
import { ProfileComponent } from './component/profile/profile.component';
import { notAuthGuard } from './Guard/not-auth.guard';
import { ProductDetailesComponent } from './component/product-detailes/product-detailes.component';
import { CateogoryProductesComponent } from './component/cateogory-productes/cateogory-productes.component';
import { BrandProductesComponent } from './component/brand-productes/brand-productes.component';
import { ShippingAddressComponent } from './component/shipping-address/shipping-address.component';
import { shippingGuard } from './Guard/shipping.guard';
import { ViewOrderComponent } from './component/view-order/view-order.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',canActivate:[notAuthGuard],component:HomeComponent},
  {path:'brand',canActivate:[notAuthGuard],component:BrandComponent},
  {path:'brandProductes/:brandId',canActivate:[notAuthGuard],component:BrandProductesComponent},
  {path:'cart',canActivate:[notAuthGuard],component:CartComponent},
  {path:'category',canActivate:[notAuthGuard],component:CategoryComponent},
  {path:'cateogoryProductes/:catId',canActivate:[notAuthGuard],component:CateogoryProductesComponent},
  {path:'product',canActivate:[notAuthGuard],component:ProductsComponent},
  {path:'profile',canActivate:[notAuthGuard],component:ProfileComponent},
  {path:'productDetailes/:id',canActivate:[notAuthGuard],component:ProductDetailesComponent},
  {path:'ShippingAddress/:method',canActivate:[shippingGuard],component:ShippingAddressComponent},
  {path:'allorders',loadComponent:()=>import('./component/all-orders/all-orders.component').then((c)=>c.AllOrdersComponent)},
  {path:'auth',loadChildren:()=>import('./component/auth/auth.module').then((c)=>c.AuthModule)},
  {path:'wishlist',loadChildren:()=>import('./component/wishlist/wishlist.module').then((c)=>c.WishlistModule)},
  {path:'vieworder/:orderId',canActivate:[notAuthGuard],component:ViewOrderComponent},
  {path:'**',canActivate:[notAuthGuard],component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
