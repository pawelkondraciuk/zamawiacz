import { UserDataService } from './services/user-data.service';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { GoogleButtonComponent } from './components';

import { GoogleLoginButtonDirective } from './directives';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrderItemsService } from './services/orderItems.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    GoogleButtonComponent,
    GoogleLoginButtonDirective,
  ],
  exports: [
    MaterialModule,
    GoogleButtonComponent,
    GoogleLoginButtonDirective,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    UserDataService,
  ]
})
export class SharedModule { }
