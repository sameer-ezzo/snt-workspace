import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomErrorHandler } from '../custom-error-handler';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule.forRoot({ api_base: `${environment.base}/api` }),
    HttpClientModule
  ],
  providers: [{provide: ErrorHandler, useClass: CustomErrorHandler}],
  bootstrap: [AppComponent],
})
export class AppModule { }
