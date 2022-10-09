import { Component, OnInit } from '@angular/core';

import { WhiteboardStoreService } from '@live-monitor/ngx-whiteboard';

@Component({
  selector: 'live-monitor-live-monitor',
  templateUrl: './live-monitor.component.html',
  styleUrls: ['./live-monitor.component.scss'],
  providers: [WhiteboardStoreService]
})
export class LiveMonitorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
