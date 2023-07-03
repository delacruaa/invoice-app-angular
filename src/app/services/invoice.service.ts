import { Injectable } from '@angular/core';
import { InvoiceInterface } from '../models/InvoiceInterface';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private db: AngularFireDatabase) {}
  invoiceList = new BehaviorSubject<InvoiceInterface[]>([])
  getInvoiceList() {
    return  this.db.list<InvoiceInterface>('/').valueChanges().pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong');
      })
    )
  }
  getInvoice() {
    return this.invoiceList.asObservable()
  }
  markAsPaid(id:string) {
    return this.db.object(`${id}`).update({
      status:'paid'
    })
  }
  deleteInvoice(id:string) {
    return this.db.object(`${id}`).remove()
  }
  createInvoice(id:string, data:InvoiceInterface) {
    return this.db.object(`${id}`).set(data)
  }
  updateInvoice(id:string, data:InvoiceInterface) {
    return this.db.object(`${id}`).update(data)
  }
}
