import { AfterViewInit, Directive, HostListener, Input } from '@angular/core';

import { WhiteboardItemComponent } from '@live-monitor/ngx-whiteboard';

@Directive({
  selector: '[liveMonitorItemResize]'
})
export class ItemResizeDirective implements AfterViewInit {
  @Input() direction!: string;

  boxPosition!: { left: number; top: number };
  mouse!: { x: number; y: number };
  grabbed = false;

  constructor(private host: WhiteboardItemComponent) {}

  ngAfterViewInit() {
    console.log('afterViewInit');
    this.loadBox();
  }

  private loadBox() {
    const { left, top } = this.host.box.nativeElement.getBoundingClientRect();
    this.boxPosition = { left, top };
    console.log(this.boxPosition);
  }

  resize() {
    console.log('resize');
    console.log(this.direction);
    if (this.direction === 'e' || this.direction === 'w') {
      this.host.width = Number(this.mouse.x > this.boxPosition.left) ? this.mouse.x - this.boxPosition.left + 10 : 0;
    }

    if (this.direction === 'n' || this.direction === 's') {
      this.host.height = Number(this.mouse.y > this.boxPosition.top) ? this.mouse.y - this.boxPosition.top + 10 : 0;
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse = { x: event.clientX, y: event.clientY };
    if (this.grabbed) {
      this.resize();
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.host.dragDisabled = true;
    this.grabbed = true;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    console.log('mouseup');
    this.grabbed = false;
  }
}
