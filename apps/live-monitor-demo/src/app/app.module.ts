import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxWhiteboardModule } from '@live-monitor/ngx-whiteboard';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxWhiteboardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
