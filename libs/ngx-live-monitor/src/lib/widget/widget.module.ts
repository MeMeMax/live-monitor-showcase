/**
 * Copyright (C) 2022 Weidmueller Interface GmbH & Co. KG
 * All rights reserved.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxWhiteboardModule } from '@live-monitor/ngx-whiteboard';

import { DynamicWidgetDirective } from './directives/dynamic-widget/dynamic-widget.directive';
import { TextWidgetComponent } from './components/text/text-widget/text-widget.component';
import { WidgetRegistryService } from './services/widget-registry/widget-registry.service';

@NgModule({
  declarations: [DynamicWidgetDirective, TextWidgetComponent],
  imports: [CommonModule, NgxWhiteboardModule],
  exports: [DynamicWidgetDirective]
})
export class WidgetModule {
  constructor(private widgetRegistry: WidgetRegistryService) {
    this.widgetRegistry.registerWidget({ type: 'text', components: { widget: TextWidgetComponent }, size: { w: 100, h: 100 } });
  }
}
