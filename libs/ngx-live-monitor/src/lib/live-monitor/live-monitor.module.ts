import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxWhiteboardModule } from '@live-monitor/ngx-whiteboard';

import { LiveMonitorComponent } from './components/live-monitor/live-monitor.component';

@NgModule({
  declarations: [LiveMonitorComponent],
  imports: [CommonModule, NgxWhiteboardModule],
  exports: [LiveMonitorComponent]
})
export class LiveMonitorModule {}
