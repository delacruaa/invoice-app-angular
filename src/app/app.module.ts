import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ThemeSwitcherComponent } from './components/UI/theme-switcher/theme-switcher.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ButtonComponent } from './components/UI/button/button.component';
import { CheckboxComponent } from './components/UI/checkbox/checkbox.component';
import { InvoiceItemComponent } from './components/invoice-item/invoice-item.component';
import { environment } from 'src/environments/environments';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaidStatusComponent } from './components/UI/paid-status/paid-status.component';
import { CapitalizeFirstLetterPipe } from './pipes/capitalize-first-letter.pipe';
import { ConverDatePipe } from './pipes/conver-date.pipe';
import { InvoicePageComponent } from './pages/invoice-page/invoice-page.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';
import { SidebarComponent } from './components/UI/sidebar/sidebar.component';
import { SelectComponent } from './components/UI/select/select.component';
import { IconCheckComponent } from './components/UI/svg/icon-check/icon-check.component';
import { IconTrashComponent } from './components/UI/svg/icon-trash/icon-trash.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import {  DatePipe } from '@angular/common';

import { EditInvoiceComponent } from './components/edit-invoice/edit-invoice.component';
import { SpinnerComponent } from './components/UI/spinner/spinner.component';
import { ToastService, AngularToastifyModule } from 'angular-toastify'; 
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ThemeSwitcherComponent,
        MainPageComponent,
        ButtonComponent,
        CheckboxComponent,
        InvoiceItemComponent,
        PaidStatusComponent,
        CapitalizeFirstLetterPipe,
        ConverDatePipe,
        InvoicePageComponent,
        SidebarComponent,
        AddInvoiceComponent,
        SelectComponent,
        IconCheckComponent,
        IconTrashComponent,
        DatePickerComponent,
        EditInvoiceComponent,
        SpinnerComponent,
        
    ],
    providers: [DatePipe,ToastService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule, 
        AngularToastifyModule,
    ]
})
export class AppModule { }
