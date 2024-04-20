import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistComponent } from './wishlist/wishlist.component';
import { notAuthGuard } from 'src/app/Guard/not-auth.guard';

const routes: Routes = [
  {path:'',canActivate:[notAuthGuard],component:WishlistComponent},
  {path:'wishlist',canActivate:[notAuthGuard],component:WishlistComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishlistRoutingModule { }
