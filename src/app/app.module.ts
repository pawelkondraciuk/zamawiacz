import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { ActiveOrdersComponent } from './active-orders/active-orders.component';
import { CreateOrderComponent } from './create-order/create-order.component';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'active-orders' },
  { path: 'active-orders', component: ActiveOrdersComponent },
  { path: 'create-order', component: CreateOrderComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ActiveOrdersComponent,
    CreateOrderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
