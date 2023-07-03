import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

import { InvoiceInterface } from 'src/app/models/InvoiceInterface';
import { InvoiceService } from 'src/app/services/invoice.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.scss']
})
export class InvoicePageComponent implements OnInit {
  invoice:InvoiceInterface = {} as InvoiceInterface
  id:string=''
  isOpenSidebar=false
  loading =false
  error=false
  constructor(
    private route: ActivatedRoute, 
    private invoiceService:InvoiceService,
    private sidebarService:SidebarService, 
    private router: Router,
    private _toastService: ToastService) {}
  ngOnInit(): void {
    this.loading=true
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.id =  params['id']
      this.invoiceService.getInvoiceList().subscribe(data=> {
        console.log(id)
        data.forEach(item=> {
          if(item.id ==id) {
            this.invoice=item
            this.invoiceService.invoiceItem.next(item)
          }
        })
        this.loading=false
      }, (error)=> {
        this.loading=false
        this.error=true
      })
    });
    this.sidebarService.editInvoice.subscribe(sidebar=> {
      this.isOpenSidebar=sidebar
    })
  }
  markAsPaid(id:string) {
    this.invoiceService.markAsPaid(id)
  }
  deleteInvoice(id:string) {
    this.invoiceService.deleteInvoice(id).then(()=> {
      this._toastService.success('Deleted');
      setTimeout(()=> {
        this.router.navigate(['/']);
      },1000)
    }).catch(()=> {
      this._toastService.error('Somtething went wrong.. try again');
    })
    
  }

  openSidebar() {
    this.sidebarService.openSidebar('editInvoice')
  }
}
