import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paid-status',
  templateUrl: './paid-status.component.html',
  styleUrls: ['./paid-status.component.scss']
})
export class PaidStatusComponent {
  @Input() status!:string
}
