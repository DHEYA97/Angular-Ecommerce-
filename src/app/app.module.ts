import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { CategoryComponent } from './component/category/category.component';
import { CartComponent } from './component/cart/cart.component';
import { BrandComponent } from './component/brand/brand.component';
import { ProductsComponent } from './component/products/products.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailesComponent } from './component/product-detailes/product-detailes.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CateogoryProductesComponent } from './component/cateogory-productes/cateogory-productes.component';
import { BrandProductesComponent } from './component/brand-productes/brand-productes.component';
import { ShippingAddressComponent } from './component/shipping-address/shipping-address.component';
import { AddHeaderInterceptor } from './interseptor/add-header.interceptor';
import { LoaderComponent } from './component/loader/loader.component';
import { LoaderInterceptor } from './interseptor/loader.interceptor';
import { SearchPipe } from './pipe/search.pipe';
import { ViewOrderComponent } from './component/view-order/view-order.component';
import { FooterComponent } from './component/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    CartComponent,
    BrandComponent,
    ProductsComponent,
    NavbarComponent,
    ProfileComponent,
    ProductDetailesComponent,
    CateogoryProductesComponent,
    BrandProductesComponent,
    ShippingAddressComponent,
    LoaderComponent,
    SearchPipe,
    ViewOrderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CarouselModule,
    FormsModule,
  ],
  providers: [
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useClass:AddHeaderInterceptor,
    //   multi:true
    // }
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
