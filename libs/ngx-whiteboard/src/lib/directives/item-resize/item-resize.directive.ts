import { CdkDrag } from '@angular/cdk/drag-drop';
import { AfterViewInit, Directive, HostListener, Input } from '@angular/core';

import { WhiteboardItemComponent } from '@live-monitor/ngx-whiteboard';

@Directive({
  selector: '[liveMonitorItemResize]'
})
export class ItemResizeDirective {
  @Input() direction!: string;

  minimumBoxSize = 100;
  boxPosition!: { left: number; top: number; height: number; width: number };
  originalBoxPosition!: { left: number; top: number; height: number; width: number };
  mouse!: { x: number; y: number };
  mouseOriginalPosition!: { x: number; y: number };
  grabbed = false;

  constructor(private host: WhiteboardItemComponent) {}

  private getBoxPosition(element: any) {
    const { left, top, height, width } = element.getBoundingClientRect();

    return { left, top, height, width };
  }

  resize() {
    if (this.direction === 'e' || this.direction === 'se') {
      this.host.width = Number(this.mouse.x > this.boxPosition.left) ? this.mouse.x - this.boxPosition.left + 10 : 0;
    }

    if (this.direction === 's' || this.direction === 'se') {
      this.host.height = Number(this.mouse.y > this.boxPosition.top) ? this.mouse.y - this.boxPosition.top + 10 : 0;
    }

    if (this.direction === 'sw') {
      const width = this.originalBoxPosition.width - (this.mouse.x - this.mouseOriginalPosition.x);
      const height = this.originalBoxPosition.height + (this.mouse.y - this.mouseOriginalPosition.y);
      const x = this.originalBoxPosition.left - 10 + (this.mouse.x - this.mouseOriginalPosition.x);
      const y = this.originalBoxPosition.top;

      if (width > this.minimumBoxSize) {
        this.host.width = width;
        this.host.cdkDrag.setFreeDragPosition({ x, y });
      }
      if (height > this.minimumBoxSize) {
        this.host.height = height;
      }
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.grabbed) {
      this.mouse = { x: event.clientX, y: event.clientY };
      this.boxPosition = this.getBoxPosition((event.target as any)?.parentElement);
      this.resize();
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.host.dragDisabled = true;
    this.grabbed = true;
    this.mouseOriginalPosition = { x: event.clientX, y: event.clientY };
    this.originalBoxPosition = this.getBoxPosition(this.host.box.nativeElement);
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    console.log('mouseup');
    this.grabbed = false;
    this.host.dragDisabled = false;
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseGlobalUp(event: MouseEvent) {
    console.log('mouseglobalup');
    this.grabbed = false;
    this.host.dragDisabled = false;
  }
}
