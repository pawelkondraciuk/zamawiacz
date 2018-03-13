import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { GoogleButtonComponent } from './components';

import { GoogleLoginButtonDirective } from './directives';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    GoogleButtonComponent,
    GoogleLoginButtonDirective,
  ],
  exports: [
    MaterialModule,
    GoogleButtonComponent,
    GoogleLoginButtonDirective,
  ]
})
export class SharedModule { }
