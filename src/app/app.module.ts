import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { GoogleApiModule, NG_GAPI_CONFIG } from 'ng-gapi';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';

import { AuthGuard } from './shared/guards/auth.guard';

import { AuthService } from './shared/services/auth.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserControlsComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserControlsComponent,
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
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
