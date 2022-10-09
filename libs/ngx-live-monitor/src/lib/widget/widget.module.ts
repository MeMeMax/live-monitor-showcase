/**
 * Copyright (C) 2022 Weidmueller Interface GmbH & Co. KG
 * All rights reserved.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxWhiteboardModule } from '@live-monitor/ngx-whiteboard';

import { DynamicWidgetDirective } from './directives/dynamic-widget/dynamic-widget.directive';
import { TextWidgetComponent } from './components/text/text-widget/text-widget.component';

@NgModule({
  declarations: [DynamicWidgetDirective, TextWidgetComponent],
  imports: [CommonModule, NgxWhiteboardModule],
  exports: [DynamicWidgetDirective]
})
export class WidgetModule {}
