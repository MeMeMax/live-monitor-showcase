import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'live-monitor-whiteboard-item',
  templateUrl: './whiteboard-item.component.html',
  styleUrls: ['./whiteboard-item.component.scss']
})
export class WhiteboardItemComponent implements OnInit {
  @ViewChild('box') box!: ElementRef;
  @ViewChild(CdkDrag) cdkDrag!: CdkDrag;

  @Input() width!: number;
  @Input() height!: number;
  @Input() x!: number;
  @Input() y!: number;

  dragDisabled = false;

  constructor() {}

  ngOnInit(): void {}
}
