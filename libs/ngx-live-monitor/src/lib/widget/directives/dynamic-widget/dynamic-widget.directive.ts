/**
 * Copyright (C) 2022 Weidmueller Interface GmbH & Co. KG
 * All rights reserved.
 */

import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';

import { WidgetRegistryService } from '../../services/widget-registry/widget-registry.service';

@Directive({
  selector: '[wmDynamicWidget]'
})
export class DynamicWidgetDirective implements OnInit {
  @Input() id!: string;
  @Input() type!: string;

  constructor(private container: ViewContainerRef, private widgetRegistry: WidgetRegistryService) {}

  ngOnInit() {
    const component = this.widgetRegistry.getWidgets()[this.type]?.components.widget;

    if (component) {
      const componentRef = this.container.createComponent(component);
      componentRef.instance.id = this.id;
    } else {
      console.error(`Component '${this.type}' not found. Maybe you didn´t register it with WidgetRegistryService?`);
    }
  }
}
