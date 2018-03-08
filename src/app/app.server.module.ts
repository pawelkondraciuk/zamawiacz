import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AuthModule } from '@ngx-auth/core';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    AuthModule.forServer(),
    ModuleMapLoaderModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
