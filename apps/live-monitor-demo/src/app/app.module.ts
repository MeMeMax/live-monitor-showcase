import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LiveMonitorModule } from '@live-monitor/ngx-live-monitor';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LiveMonitorModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
