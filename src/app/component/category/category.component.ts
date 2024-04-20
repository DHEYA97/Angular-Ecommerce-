import { Component } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  constructor(private _GetdataService:GetdataService){}
  ngOnInit(): void {
    this.getCategoresData()
  }
  categoresList:any[] = []
  getCategoresData()
{
  this._GetdataService.getData(this._GetdataService.baseUrl,"categories").subscribe((data)=>{
  this.categoresList = data.data
})
}
}
