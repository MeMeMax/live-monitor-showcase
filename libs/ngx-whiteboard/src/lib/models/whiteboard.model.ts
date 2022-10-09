/**
 * Copyright (C) 2022 Weidmueller Interface GmbH & Co. KG
 * All rights reserved.
 */

export interface WhiteboardItem {
  id?: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [customProperty: string]: any; // user of this lib can have arbitrary properties in their items
}

export interface UpdateWhiteboardItems {
  itemIdCount?: number;
  whiteboardItems: Array<WhiteboardItem>;
}
