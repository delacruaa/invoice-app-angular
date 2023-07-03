import { Component, HostListener, OnInit } from '@angular/core';
import { IFilter } from 'src/app/models/IFIlter';
import { InvoiceInterface } from 'src/app/models/InvoiceInterface';
import { FilterService } from 'src/app/services/filter.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  filterArr!:IFilter[] 
  isOpenDropdown=false
  invoiceList:InvoiceInterface[] = [] 
  isOpenSidebar=false
  loading=false
  error=false
  activeFilters!:IFilter[]
  constructor(private filterService:FilterService, private invoiceService:InvoiceService,private sidebarService:SidebarService) {}
  ngOnInit(): void {
    this.loading=true
    this.filterService.filterArr.subscribe(item=> {
      this.filterArr=item
    })
    this.invoiceService.getInvoiceList().subscribe(invoiceList=> {
      this.invoiceService.invoiceList.next(invoiceList)
      this.filterService.filterArr.subscribe(item=> {
        this.activeFilters = item.filter(filter => filter.isActive);
        if (this.activeFilters.length === 0 || this.activeFilters.length === item.length) {
          this.invoiceList=invoiceList 
        } else {
          this.invoiceList= invoiceList.filter(list => this.activeFilters.some(filter => filter.title.toLowerCase() === list.status));
        }
      })
      this.loading=false
    },(error)=> {
      this.loading=false
      this.error=true
    })
    this.sidebarService.addInvoice.subscribe(sidebar=> {
      this.isOpenSidebar=sidebar
    })
  }
  handleCheckbox(title:string) {
    this.filterService.handleCheckbox(title,this.filterArr)
  }
  toggleDropdown() {
    this.isOpenDropdown =!this.isOpenDropdown
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    this.isOpenDropdown=false
  }

  openSidebar() {
    this.sidebarService.openSidebar('addInvoice')
  }
}
