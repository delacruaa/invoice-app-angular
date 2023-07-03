import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
  
})
export class DatePickerComponent implements OnInit {
  constructor(private datePipe: DatePipe) { }
  currentDate = new Date();
  month!:string | null;
  @Input() currentMonth!:string;
  @Output() currentMonthChanged: EventEmitter<string> = new EventEmitter();
  lastDayOfMounth!:number
  days!:string[]
  ngOnInit(): void {
    this.getDateData() 
    
  }
  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.getDateData() 
  }
  
  previousMonth() {
    this.currentDate!.setMonth(this.currentDate.getMonth() - 1);
    this.getDateData() 
  }

  getDateData() {
    this.month =  this.datePipe.transform(this.currentDate, 'dd MMM yyyy');
    this.lastDayOfMounth = this.getDaysInMonth(this.month! )
    this.days=[]
    for(let i =1; i<=this.lastDayOfMounth; i++) {
      this.days.push(i+ ' ' + this.month?.substring(3) )
    }
  }
  getDaysInMonth(currentDate: string): number {
    let monthNumber = new Date(currentDate).getMonth()+1
    let year = new Date(currentDate).getFullYear()
    const lastDay = new Date(+year, monthNumber, 0).getDate();
    return lastDay;
  }

  currentMonthChange(day:string) {
    this.currentMonthChanged.emit(day)
  }
}
