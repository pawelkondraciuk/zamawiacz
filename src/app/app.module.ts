import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GraphQLModule } from './apollo.config';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
