import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthModule } from '@ngx-auth/core';
import { GraphQLModule } from './graphql.module';

import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    GraphQLModule,
    AuthModule.forRoot(),
    SharedModule,
    AppRoutingModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
