import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';
import { UserDataService } from '../shared/services/user-data.service';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
  ],
  declarations: [UserComponent],
  providers: [UserDataService],
})
export class UserModule { }
