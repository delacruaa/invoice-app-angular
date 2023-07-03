import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-check',
  templateUrl: './icon-check.component.svg',
  styleUrls: ['./icon-check.component.scss']
})
export class IconCheckComponent {
  @Input() fill='#FFF'
}
