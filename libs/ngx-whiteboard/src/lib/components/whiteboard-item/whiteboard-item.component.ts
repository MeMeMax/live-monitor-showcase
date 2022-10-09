import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'live-monitor-whiteboard-item',
  templateUrl: './whiteboard-item.component.html',
  styleUrls: ['./whiteboard-item.component.scss']
})
export class WhiteboardItemComponent implements OnInit {
  @ViewChild('box') box!: ElementRef;
  @ViewChild(CdkDrag) cdkDrag!: CdkDrag;

  @Input() id!: string;
  @HostBinding('style.width.px') @Input() width!: number;
  @HostBinding('style.height.px') @Input() height!: number;

  dragDisabled = false;

  constructor() {}

  ngOnInit(): void {}
}
