import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { GoogleButtonComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    GoogleButtonComponent,
  ],
  declarations: [
    GoogleButtonComponent,
  ]
})
export class SharedModule { }
