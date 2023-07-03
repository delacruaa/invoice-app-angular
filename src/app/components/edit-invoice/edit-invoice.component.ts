import { DatePipe } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { InvoiceInterface } from 'src/app/models/InvoiceInterface';
import { InvoiceService } from 'src/app/services/invoice.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {
  invoice:InvoiceInterface = {} as InvoiceInterface
  formGroup!:FormGroup
  submitted = false;
  selects= ['Net 1 days','Net 7 days','Net 14 days','Net 30 days']
  currentSelect!:string
  isSelectOpen=false
  currentMonth!:string;
  constructor(private datePipe: DatePipe, private invoiceServie: InvoiceService,private _toastService: ToastService, private sidebarService:SidebarService,  private route: ActivatedRoute, ) { }
  ngOnInit(): void {
    this.invoiceServie.getInvoiceItem().subscribe(data=> {
      this.invoice = data
      this.currentSelect = `Net ${data.paymentTerms} days`
      
      this.currentMonth = this.datePipe.transform(new Date(data.createdAt), 'd MMM yyyy')!; 
      let itemList = data.items.map(item=> {
        return new FormGroup({
          name:new FormControl(item.name, [Validators.required]),
          quantity:new FormControl(item.quantity, [Validators.required]),
          price:new FormControl(item.price, [Validators.required]),
        })
      })
      this.formGroup = new FormGroup({
        fromStreetAddress:new FormControl(data.clientAddress.street, [Validators.required]),
        fromCity:new FormControl(data.clientAddress.city, [Validators.required]),
        fromPostCode:new FormControl(data.clientAddress.postCode, [Validators.required]),
        fromCountry:new FormControl(data.clientAddress.country, [Validators.required]),
        clientName:new FormControl(data.clientName, [Validators.required]),
        clientEmail:new FormControl(data.clientEmail, [Validators.required, Validators.email]),
        toStreetAddress:new FormControl(data.senderAddress.street, [Validators.required]),
        toCity:new FormControl(data.senderAddress.city, [Validators.required]),
        toPostCode:new FormControl(data.senderAddress.postCode, [Validators.required]),
        toCountry:new FormControl(data.senderAddress.country, [Validators.required]),
        projectDescription:new FormControl(data.description, [Validators.required]),
        itemList: new FormArray(itemList!)
      })
    })
  }
  get itemListFormGroups () {
    return this.formGroup.get('itemList') as FormArray
  }
  addItemList() {
    const item=<FormArray>this.formGroup.controls['itemList'];
    item.push(
      new FormGroup({
        name:new FormControl('', [Validators.required]),
        quantity:new FormControl('', [Validators.required]),
        price:new FormControl('', [Validators.required]),
      
      })
    )
  }
  removeItemList(index:number) {
    const item=<FormArray>this.formGroup.controls['itemList'];
    item.removeAt(index)
  }

  currentContentChanged(newValue: string) {
    this.currentSelect = newValue;
    this.isSelectOpen=false
  }
  openDropdown() {
    this.isSelectOpen=!this.isSelectOpen
  }
 
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.isSelectOpen=false
  }
  onKeyDown(event: any) {
    event.preventDefault(); 
  }
  closeSidebar() {
    this.sidebarService.closeSidebar('editInvoice')
  }
  extractDigitsFromString(str:string) {
    const digits = str.match(/\d+/g);
    return digits ? digits.join('') : '';
  }
  getPaymentDue(dateStr:string) {
    let dateNum =this.extractDigitsFromString(this.currentSelect)
    let result =''
    if(dateNum=='1') {
      result = this.datePipe.transform(new Date(new Date(dateStr).getTime() + (24 * 60 * 60 * 1000)), 'dd MMM yyyy')!; 
    }
    if(dateNum=='7') {
      result = this.datePipe.transform(new Date(new Date(dateStr).getTime() + (7 * 24 * 60 * 60 * 1000)), 'dd MMM yyyy')!; 
    }
    if(dateNum=='14') {
      result = this.datePipe.transform(new Date(new Date(dateStr).getTime() + (14 * 24 * 60 * 60 * 1000)), 'dd MMM yyyy')!; 
    }
    if(dateNum=='30') {
      result = this.datePipe.transform(new Date(new Date(dateStr).getTime() + (30 * 24 * 60 * 60 * 1000)), 'dd MMM yyyy')!; 
    }
    return this.convertDateFormat(result)
  }
  convertDateFormat(dateStr:string) {
    const dateParts = dateStr.split(' ');
    const months = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12'
    };
  
    const year = dateParts[2];
    //@ts-ignore
    const month = months[dateParts[1]];
    const day = dateParts[0];
  
    return `${year}-${month}-${day}`;
  }
  submitForm() {
    this.submitted=true
    if(this.formGroup.valid) {
        //@ts-ignore
      let items = this.formGroup.value.itemList.map((item,index)=> {
        return {
          name: item.name.trim(),
          quantity: item.quantity,
          price: item.price,
          total: (item.price *item.quantity)
        }
      })
      
      let data= {
        id: this.invoice.id,
        createdAt: this.invoice.createdAt,
        paymentDue: this.getPaymentDue(this.currentMonth!),
        description: this.formGroup.value.projectDescription.trim(),
        paymentTerms: this.extractDigitsFromString(this.currentSelect),
        clientName: this.formGroup.value.clientName.trim(),
        clientEmail: this.formGroup.value.clientEmail.trim(),
        status: this.invoice.status,
        senderAddress: {
            street: this.formGroup.value.toStreetAddress.trim(),
            city: this.formGroup.value.toCity.trim(),
            postCode: this.formGroup.value.toPostCode.trim(),
            country: this.formGroup.value.toCountry.trim(),
        },
        clientAddress: {
          street: this.formGroup.value.fromStreetAddress.trim(),
          city: this.formGroup.value.fromCity.trim(),
          postCode: this.formGroup.value.fromPostCode.trim(),
          country: this.formGroup.value.fromCountry.trim(),
        },
        items: items,
        //@ts-ignore
        total: items.reduce((sum, item) => sum + item.total, 0)
      }
      this.submitted=false
       //@ts-ignore
       this.invoiceServie.updateInvoice(data.id, data).then(()=> {
        this._toastService.success('Updated');
      }).catch(()=> {
        this._toastService.error('Something get wrong... try later');
      })
    }
  }
}
