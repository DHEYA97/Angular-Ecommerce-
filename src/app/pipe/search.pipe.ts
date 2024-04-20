import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(productesList:any[],search:string): any[] {
    return productesList.filter((e)=>e.title.toLowerCase().includes(search.toLowerCase())
    );
  }
}
