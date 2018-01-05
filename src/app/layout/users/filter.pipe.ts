import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      console.log(it.firstName.concat(' ').concat(it.lastName));
      console.log(it.firstName.concat(' ').concat(it.lastName).toLowerCase());
      console.log(it.firstName.concat(' ').concat(it.lastName).toLowerCase().includes(searchText));
      return it.firstName.concat(' ').concat(it.lastName).toLowerCase().includes(searchText);
    });
  }
}
