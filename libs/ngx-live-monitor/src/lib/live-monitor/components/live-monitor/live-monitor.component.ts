import { Component, OnInit } from '@angular/core';

import { WhiteboardItem, WhiteboardStoreService } from '@live-monitor/ngx-whiteboard';

import { Observable } from 'rxjs';

@Component({
  selector: 'live-monitor-live-monitor',
  templateUrl: './live-monitor.component.html',
  styleUrls: ['./live-monitor.component.scss'],
  providers: [WhiteboardStoreService]
})
export class LiveMonitorComponent implements OnInit {
  whiteboardItem$!: Observable<Array<WhiteboardItem>>;

  constructor(private whiteboardStore: WhiteboardStoreService) {
    this.whiteboardItem$ = this.whiteboardStore.whiteboardItem$;
  }

  ngOnInit(): void {
    this.whiteboardStore.addWhiteboardItem({ type: 'text', x: 0, y: 0, w: 6, h: 3 });
    this.whiteboardStore.addWhiteboardItem({ type: 'text', x: 6, y: 0, w: 6, h: 3 });
  }

  identifyItem(_index: number, item: WhiteboardItem) {
    return item.id;
  }
}
