import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'live-monitor-whiteboard-item',
  templateUrl: './whiteboard-item.component.html',
  styleUrls: ['./whiteboard-item.component.scss']
})
export class WhiteboardItemComponent implements OnInit {
  @ViewChild('box') box!: ElementRef;

  @Input() public width!: number;
  @Input() public height!: number;

  dragDisabled = false;

  constructor() {}

  ngOnInit(): void {}
}
