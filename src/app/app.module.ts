import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';

import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './shared/services/user.service';
import { GoogleApiModule, NG_GAPI_CONFIG } from 'ng-gapi';
import { GoogleButtonComponent } from './google-button/google-button.component';
import { AuthGuard } from './shared/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GoogleButtonComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: { client_id: '623272395666-9t1hpgmm1k609kjvq4s8kf88abuh1jlt.apps.googleusercontent.com' }
    }),
    GraphQLModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    AuthGuard,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
