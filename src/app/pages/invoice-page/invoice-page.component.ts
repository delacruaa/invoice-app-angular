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
  constructor(
    private route: ActivatedRoute, 
    private invoiceService:InvoiceService,
    private sidebarService:SidebarService, 
    private router: Router,
    private _toastService: ToastService) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.id =  params['id']
      this.invoiceService.getInvoice().subscribe(data=> {
        data.forEach(item=> {
          if(item.id ==id) {
            this.invoice=item
          }
        })
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
