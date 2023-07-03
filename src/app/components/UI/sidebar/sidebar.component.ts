import { Component, Input, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpenSidebar=false
  @Input() sidebarName!:string
  constructor(private sidebarService:SidebarService) {}
  
  closeSidebar() {
    this.sidebarService.closeSidebar(this.sidebarName)
  }
}
