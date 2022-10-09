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
    if (this.direction === 'sw') {
      this.resizeSouthWest();
    } else if (this.direction === 'ne') {
      this.resizeNorthEast();
    } else if (this.direction === 'se') {
      this.resizeSouthEast();
    } else {
      this.resizeOtherSides();
    }
  }

  resizeSouthWest() {
    const width = this.originalBoxPosition.width - (this.mouse.x - this.mouseOriginalPosition.x);
    const height = this.originalBoxPosition.height + (this.mouse.y - this.mouseOriginalPosition.y);
    const x = this.originalBoxPosition.left + (this.mouse.x - this.mouseOriginalPosition.x);
    const y = this.originalBoxPosition.top;

    if (width > this.minimumBoxSize) {
      this.host.width = width;
      this.host.cdkDrag.setFreeDragPosition({ x, y });
    }
    if (height > this.minimumBoxSize) {
      this.host.height = height;
    }
  }

  resizeNorthEast() {
    const width = this.originalBoxPosition.width + (this.mouse.x - this.mouseOriginalPosition.x);
    const height = this.originalBoxPosition.height - (this.mouse.y - this.mouseOriginalPosition.y);
    const x = this.originalBoxPosition.left;
    const y = this.originalBoxPosition.top + (this.mouse.y - this.mouseOriginalPosition.y);

    if (width > this.minimumBoxSize) {
      this.host.width = width;
    }
    if (height > this.minimumBoxSize) {
      this.host.height = height;
      this.host.cdkDrag.setFreeDragPosition({ x, y });
    }
  }

  resizeSouthEast() {
    const width = this.originalBoxPosition.width + (this.mouse.x - this.mouseOriginalPosition.x);
    const height = this.originalBoxPosition.height + (this.mouse.y - this.mouseOriginalPosition.y);

    if (width > this.minimumBoxSize) {
      this.host.width = width;
    }
    if (height > this.minimumBoxSize) {
      this.host.height = height;
    }
  }

  resizeOtherSides() {
    const width = this.originalBoxPosition.width - (this.mouse.x - this.mouseOriginalPosition.x);
    const height = this.originalBoxPosition.height - (this.mouse.y - this.mouseOriginalPosition.y);
    const x = this.originalBoxPosition.left + (this.mouse.x - this.mouseOriginalPosition.x);
    const y = this.originalBoxPosition.top + (this.mouse.y - this.mouseOriginalPosition.y);

    if (width > this.minimumBoxSize) {
      this.host.width = width;
    }
    if (height > this.minimumBoxSize) {
      this.host.height = height;
    }
    if (width > this.minimumBoxSize && height > this.minimumBoxSize) {
      this.host.cdkDrag.setFreeDragPosition({ x, y });
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
