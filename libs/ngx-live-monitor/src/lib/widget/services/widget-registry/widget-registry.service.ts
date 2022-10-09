import { Injectable } from '@angular/core';

import { WidgetConfiguration, Widgets } from '../../models/widget-registry.model';

@Injectable({
  providedIn: 'root'
})
export class WidgetRegistryService {
  private widgets: Widgets = {};

  constructor() {}

  registerWidget(config: WidgetConfiguration): void {
    const { type } = config;

    if (!this.widgets[type]) {
      this.widgets[type] = config;
    } else {
      console.error(`The type '${type}' for the widget you want to register already exists. Make sure you don´t register it twice.`);
    }
  }

  getWidgets() {
    return this.widgets;
  }
}
