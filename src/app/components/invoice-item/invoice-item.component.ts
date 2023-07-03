import { Component, Input } from '@angular/core';
import { InvoiceInterface } from 'src/app/models/InvoiceInterface';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss']
})
export class InvoiceItemComponent {
  @Input() invoice!:InvoiceInterface
}
