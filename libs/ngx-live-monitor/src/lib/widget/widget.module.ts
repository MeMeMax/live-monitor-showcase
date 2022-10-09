/**
 * Copyright (C) 2022 Weidmueller Interface GmbH & Co. KG
 * All rights reserved.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxWhiteboardModule } from '@live-monitor/ngx-whiteboard';

import { DynamicWidgetDirective } from './directives/dynamic-widget/dynamic-widget.directive';

@NgModule({
  declarations: [DynamicWidgetDirective],
  imports: [CommonModule, NgxWhiteboardModule],
  exports: [DynamicWidgetDirective]
})
export class WidgetModule {}
