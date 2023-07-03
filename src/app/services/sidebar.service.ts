import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  addInvoice = new BehaviorSubject<boolean>(false)
  editInvoice = new BehaviorSubject<boolean>(false)

  openSidebar(sidebarName:string) {
    //@ts-ignore
    this[sidebarName].next(true)
  }

  closeSidebar(sidebarName:string) {
   //@ts-ignore
    this[sidebarName].next(false)
  }
}
