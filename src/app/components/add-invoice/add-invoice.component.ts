import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';

import { InvoiceService } from 'src/app/services/invoice.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss'],
  
})
export class AddInvoiceComponent implements OnInit {
  formGroup!:FormGroup
  submitted = false;
  selects= ['Net 1 days','Net 7 days','Net 14 days','Net 30 days']
  currentSelect='Net 1 days'
  isSelectOpen=false
  isDatePickerOpen=false
  currentMonth =  this.datePipe.transform(new Date(), 'd MMM yyyy');
  constructor(private datePipe: DatePipe, private invoiceServie: InvoiceService,private  sidebarService:SidebarService,private _toastService: ToastService) { }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      fromStreetAddress:new FormControl('', [Validators.required]),
      fromCity:new FormControl('', [Validators.required]),
      fromPostCode:new FormControl('', [Validators.required]),
      fromCountry:new FormControl('', [Validators.required]),
      clientName:new FormControl('', [Validators.required]),
      clientEmail:new FormControl('', [Validators.required, Validators.email]),
      toStreetAddress:new FormControl('', [Validators.required]),
      toCity:new FormControl('', [Validators.required]),
      toPostCode:new FormControl('', [Validators.required]),
      toCountry:new FormControl('', [Validators.required]),
      projectDescription:new FormControl('', [Validators.required]),
      itemList: new FormArray([
        new FormGroup({
          name:new FormControl('', [Validators.required]),
          quantity:new FormControl('', [Validators.required]),
          price:new FormControl('', [Validators.required]),
        })
      ])
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
  currentMonthChanged(newValue: string) {
    this.currentMonth = newValue;
  }
  openDropdown() {
    this.isSelectOpen=!this.isSelectOpen
  }
  openDatePicker() {
    this.isDatePickerOpen=!this.isDatePickerOpen
  }
  closeSidebar() {
    this.sidebarService.closeSidebar('addInvoice')
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.isSelectOpen=false
    this.isDatePickerOpen=false
  }
  onKeyDown(event: any) {
    event.preventDefault(); 
  }
  generateId() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let id = '';
    for (let i = 0; i < 2; i++) {
      id += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    const digits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    id += digits;
    return id;
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
    let newDate =  this.datePipe.transform(new Date(dateStr), 'dd MMM yyyy');
    const dateParts = newDate!.split(' ');
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
  submitForm(status:string) {
     console.log(status)
    this.submitted=true
    if(this.formGroup.valid) {
        //@ts-ignore
      let items = this.formGroup.value.itemList.map((item,index)=> {
        return {
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: (item.price *item.quantity)
        }
      })
      
      let data= {
        id: this.generateId(),
        createdAt: this.convertDateFormat(this.currentMonth!),
        paymentDue: this.getPaymentDue(this.currentMonth!),
        description: this.formGroup.value.projectDescription,
        paymentTerms: this.extractDigitsFromString(this.currentSelect),
        clientName: this.formGroup.value.clientName,
        clientEmail: this.formGroup.value.clientEmail,
        status: status,
        senderAddress: {
            street: this.formGroup.value.toStreetAddress,
            city: this.formGroup.value.toCity,
            postCode: this.formGroup.value.toPostCode,
            country: this.formGroup.value.toCountry,
        },
        clientAddress: {
          street: this.formGroup.value.fromStreetAddress,
          city: this.formGroup.value.fromCity,
          postCode: this.formGroup.value.fromPostCode,
          country: this.formGroup.value.fromCountry,
        },
        items: items,
        //@ts-ignore
        total: items.reduce((sum, item) => sum + item.total, 0)
      }
      this.submitted=false
       //@ts-ignore
       this.invoiceServie.createInvoice(data.id, data).then(()=> {
        this._toastService.success('Created');
      }).catch(()=> {
        this._toastService.error('Something get wrong... try later');
      })
    }
  }
  
}

