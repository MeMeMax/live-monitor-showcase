import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';
import { WhiteboardItemComponent } from './components/whiteboard-item/whiteboard-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [WhiteboardComponent, WhiteboardItemComponent]
})
export class NgxWhiteboardModule {}
