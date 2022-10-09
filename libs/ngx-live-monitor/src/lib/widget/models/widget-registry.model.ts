/**
 * Copyright (C) 2022 Weidmueller Interface GmbH & Co. KG
 * All rights reserved.
 */

export interface ComponentType<T> {
  new (...args: any[]): T;
}

export interface WidgetComponent extends ComponentType<any> {}

export interface ConfigComponent extends ComponentType<any> {}

export interface MenuElementComponent extends ComponentType<any> {
  type?: string;
}

export interface Components {
  widget: WidgetComponent;
  config?: ConfigComponent;
}

export interface Widgets {
  [type: string]: WidgetConfiguration;
}

export interface WidgetConfiguration {
  type: string;
  components: Components;
  size?: { w: number; h: number };
}
