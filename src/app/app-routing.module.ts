import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { InvoicePageComponent } from './pages/invoice-page/invoice-page.component';

const routes: Routes = [
  {path: '', component:MainPageComponent},
  {path:':id', component: InvoicePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
