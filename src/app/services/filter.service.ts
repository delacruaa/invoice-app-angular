import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFilter } from '../models/IFIlter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filterArr =new BehaviorSubject<IFilter[]>([
      {title:'Draft', isActive: false},
      {title:'Pending', isActive: false},
      {title:'Paid', isActive: false}])
  handleCheckbox(title:string,filterArr:IFilter[]) {
    let newFilterArr = filterArr.map(item=> {
      if(item.title==title) {
          return {...item, isActive:!item.isActive }
      }
      return item
    })
    this.filterArr.next(newFilterArr)
  }
}
