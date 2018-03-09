import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserDataService } from '../shared/user-data.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserComponent],
  providers: [UserDataService],
  exports: [UserComponent]
})
export class UserModule { }
