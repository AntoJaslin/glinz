import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './theme/app-layout/app-layout.component';
import { NavBarComponent } from './theme/app-layout/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
