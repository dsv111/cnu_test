import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], property:string,filtervalue:any): any[] {
    if(!items || !property || !filtervalue === undefined){
      return items;
    }
    return items.filter(item=>item[property]=== filtervalue);
  }
  

}
