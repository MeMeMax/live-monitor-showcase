import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteboardItemComponent } from './whiteboard-item.component';

describe('WhiteboardItemComponent', () => {
  let component: WhiteboardItemComponent;
  let fixture: ComponentFixture<WhiteboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhiteboardItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WhiteboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
