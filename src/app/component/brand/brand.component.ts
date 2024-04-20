import { Component } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent {
  brandsList:any[] = []
constructor(private _GetdataService:GetdataService){
}
  ngOnInit(): void {
    this.getBrandsData()
  }
getBrandsData()
{
  this._GetdataService.getData(this._GetdataService.baseUrl,"brands").subscribe((data)=>{
  this.brandsList = data.data
})
}
}
