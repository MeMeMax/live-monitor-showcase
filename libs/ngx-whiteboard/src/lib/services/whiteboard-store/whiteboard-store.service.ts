import { Injectable } from '@angular/core';

import { ComponentStore } from '@ngrx/component-store';
import { Observable, tap } from 'rxjs';
import { UpdateWhiteboardItems, WhiteboardItem } from '../../models/whiteboard.model';

export interface GridstackState {
  whiteboardItems: Array<WhiteboardItem>;
  itemIdCount: number;
}

const defaultState: GridstackState = {
  whiteboardItems: [],
  itemIdCount: 0
};
@Injectable()
export class WhiteboardStoreService extends ComponentStore<GridstackState> {
  constructor() {
    super(defaultState);
  }

  /**
   * Selectors
   */

  readonly currentState$: Observable<GridstackState> = this.select((state) => state);
  readonly whiteboardItem$: Observable<Array<WhiteboardItem>> = this.select(({ whiteboardItems }) => whiteboardItems);

  /**
   * Updater
   */

  readonly updateState = this.updater((state, newState: GridstackState) => {
    return {
      ...state,
      ...newState
    };
  });

  readonly updateWhiteboardItems = this.updater((state, update: UpdateWhiteboardItems) => {
    return {
      ...state,
      itemIdCount: update.itemIdCount ?? state.itemIdCount,
      whiteboardItems: update.whiteboardItems
    };
  });

  readonly addWhiteboardItem = this.effect((newWhiteboardItem$: Observable<WhiteboardItem>) => {
    return newWhiteboardItem$.pipe(
      tap((whiteboardItem: WhiteboardItem) => {
        const nextId = this.get((state) => state.itemIdCount) + 1;
        const whiteboardItems = this.get((state) => state.whiteboardItems);

        this.updateWhiteboardItems({ itemIdCount: nextId, whiteboardItems: [...whiteboardItems, { ...whiteboardItem, id: `${nextId}` }] });
      })
    );
  });

  readonly addWhiteboardItems = this.effect((newWhiteboardItem$: Observable<Array<WhiteboardItem>>) => {
    return newWhiteboardItem$.pipe(
      tap((newWhiteboardItems: Array<WhiteboardItem>) => {
        const itemIdCount = this.get((state) => state.itemIdCount) + 1;
        const whiteboardItems = this.get((state) => state.whiteboardItems);
        const itemsToAdd: Array<WhiteboardItem> = newWhiteboardItems.map((item, index) => {
          return { ...item, id: `${itemIdCount + index}` };
        });

        this.updateWhiteboardItems({ itemIdCount: itemIdCount + itemsToAdd.length - 1, whiteboardItems: [...whiteboardItems, ...itemsToAdd] });
      })
    );
  });

  readonly removeWhiteboardItem = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      tap((id: string) => {
        const whiteboardItems = this.get((state) => state.whiteboardItems);

        this.updateWhiteboardItems({ whiteboardItems: whiteboardItems.filter((item) => item.id !== id) });
      })
    );
  });

  readonly modifyWhiteboardItem = this.effect((whiteboardItem$: Observable<WhiteboardItem>) => {
    return whiteboardItem$.pipe(
      tap((whiteboardItem: WhiteboardItem) => {
        const whiteboardItems = this.get((state) => state.whiteboardItems);
        const updatedWhiteboardItems = whiteboardItems.map((item) => {
          if (item.id === whiteboardItem.id) {
            return { ...item, ...whiteboardItem };
          }

          return item;
        });

        this.updateWhiteboardItems({ whiteboardItems: updatedWhiteboardItems });
      })
    );
  });

  readonly modifyWhiteboardItems = this.effect((whiteboardItems$: Observable<Array<WhiteboardItem>>) => {
    return whiteboardItems$.pipe(
      tap((modifiedWhiteboardItems: Array<WhiteboardItem>) => {
        const whiteboardItems = this.get((state) => state.whiteboardItems);
        const updatedWhiteboardItems = whiteboardItems.map((item) => {
          const machtingWhiteboardItem = modifiedWhiteboardItems.find((modifiedWhiteboardItem) => item.id === modifiedWhiteboardItem.id);
          if (machtingWhiteboardItem) {
            return { ...item, ...machtingWhiteboardItem };
          }

          return item;
        });

        this.updateWhiteboardItems({ whiteboardItems: updatedWhiteboardItems });
      })
    );
  });

  /**
   *
   * @param id The id of the dashboard item
   * @param property The property which should be selected from the dashboard item
   * @returns Can be anything that was put in the store - Therefore this is unknown
   */
  selectWhiteboardItemPropertyById(id: string, property: string): Observable<any> {
    return this.select(({ whiteboardItems }) => whiteboardItems.find((item) => item.id === id)?.[property]);
  }

  /**
   *
   * @param id The id of the dashboard item
   * @param properties Properties as a string Array which should be selected from the dashboard item
   * @returns Can be anything that was put in the store - Therefore this is unknown
   */
  selectNestedWhiteboardItemPropertiesById(id: string, properties: Array<string>): Observable<any> {
    return this.select(({ whiteboardItems }) =>
      this.getNestedObject(
        whiteboardItems.find((item) => item.id === id),
        properties
      )
    );
  }

  /**
   *
   * @param obj An arbitrary object - Therefore this is any
   * @param properties A string Array which defines the path to the desired property
   * @returns Can be anything that is in the object - Therefore this is unknown
   */
  private getNestedObject(obj: any, properties: Array<string>): any {
    for (const prop of properties) {
      obj = obj ? obj[prop] : undefined;
    }

    return obj;
  }
}
