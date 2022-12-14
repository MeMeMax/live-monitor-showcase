import { Directive, HostListener, Input } from '@angular/core';

import { WhiteboardItemComponent } from '../../components/whiteboard-item/whiteboard-item.component';

@Directive({
  selector: '[liveMonitorItemResize]'
})
export class ItemResizeDirective {
  @Input() direction!: string;

  minimumBoxSize = 100;
  boxPosition!: { left: number; top: number; height: number; width: number }; // Todo: define modles for all these inline type definitions
  originalBoxPosition!: { left: number; top: number; height: number; width: number };
  mouse!: { x: number; y: number };
  mouseOriginalPosition!: { x: number; y: number };
  grabbed = false;

  constructor(private host: WhiteboardItemComponent) {}

  private getBoxPosition(element: HTMLElement) {
    const { left, top, height, width } = element.getBoundingClientRect();

    return { left, top, height, width };
  }

  resize() {
    if (this.direction === 'e') {
      this.resizeEast();
    }
    if (this.direction === 'w') {
      this.resizeWest();
    }
    if (this.direction === 'n') {
      this.resizeNorth();
    }
    if (this.direction === 's') {
      this.resizeSouth();
    } else if (this.direction === 'sw') {
      this.resizeSouthWest();
    } else if (this.direction === 'ne') {
      this.resizeNorthEast();
    } else if (this.direction === 'se') {
      this.resizeSouthEast();
    } else if (this.direction === 'nw') {
      this.resizeNorthWest();
    }
  }

  resizeNorth() {
    const height = this.originalBoxPosition.height - (this.mouse.y - this.mouseOriginalPosition.y);
    const x = this.originalBoxPosition.left;
    const y = this.originalBoxPosition.top + (this.mouse.y - this.mouseOriginalPosition.y);

    if (height > this.minimumBoxSize) {
      this.host.height = height;
      this.host.cdkDrag.setFreeDragPosition({ x, y });
    }
  }

  resizeEast() {
    const width = this.originalBoxPosition.width + (this.mouse.x - this.mouseOriginalPosition.x);

    if (width > this.minimumBoxSize) {
      this.host.width = width;
    }
  }

  resizeSouth() {
    const height = this.originalBoxPosition.height + (this.mouse.y - this.mouseOriginalPosition.y);

    if (height > this.minimumBoxSize) {
      this.host.height = height;
    }
  }

  resizeWest() {
    const width = this.originalBoxPosition.width - (this.mouse.x - this.mouseOriginalPosition.x);
    const x = this.originalBoxPosition.left + (this.mouse.x - this.mouseOriginalPosition.x);
    const y = this.originalBoxPosition.top;

    if (width > this.minimumBoxSize) {
      this.host.width = width;
      this.host.cdkDrag.setFreeDragPosition({ x, y });
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

  resizeNorthWest() {
    const width = this.originalBoxPosition.width - (this.mouse.x - this.mouseOriginalPosition.x);
    const height = this.originalBoxPosition.height - (this.mouse.y - this.mouseOriginalPosition.y);
    let x = this.originalBoxPosition.left + this.minimumBoxSize;
    let y = this.originalBoxPosition.top + this.minimumBoxSize;

    if (width > this.minimumBoxSize) {
      x = this.originalBoxPosition.left + (this.mouse.x - this.mouseOriginalPosition.x);
      this.host.width = width;
    }

    if (height > this.minimumBoxSize) {
      y = this.originalBoxPosition.top + (this.mouse.y - this.mouseOriginalPosition.y);
      this.host.height = height;
    }

    if (width > this.minimumBoxSize || height > this.minimumBoxSize) {
      this.host.cdkDrag.setFreeDragPosition({ x, y });
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.grabbed) {
      this.mouse = { x: event.clientX, y: event.clientY };
      this.boxPosition = this.getBoxPosition(this.host.box.nativeElement);
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
    this.grabbed = false;
    this.host.dragDisabled = false;
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseGlobalUp(event: MouseEvent) {
    this.grabbed = false;
    this.host.dragDisabled = false;
  }
}
