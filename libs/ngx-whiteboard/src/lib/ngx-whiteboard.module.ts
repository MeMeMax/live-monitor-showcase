import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';
import { WhiteboardItemComponent } from './components/whiteboard-item/whiteboard-item.component';

@NgModule({
  imports: [CommonModule, DragDropModule],
  declarations: [WhiteboardComponent, WhiteboardItemComponent],
  exports: [WhiteboardComponent, WhiteboardItemComponent]
})
export class NgxWhiteboardModule {}
