import { ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { WidgetRegistryService } from '../../services/widget-registry/widget-registry.service';
import { TextWidgetComponent } from '../../components/text/text-widget/text-widget.component';
import { DynamicWidgetDirective } from './dynamic-widget.directive';

describe('DynamicWidgetDirective', () => {
  let container: ViewContainerRef;
  let widgetRegistry: WidgetRegistryService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ViewContainerRef,
          useValue: {
            createComponent: () => ({
              instance: {
                type: 'text'
              }
            })
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    });
    container = TestBed.inject(ViewContainerRef);
    widgetRegistry = TestBed.inject(WidgetRegistryService);
  });
  it('should create an instance', () => {
    const directive = new DynamicWidgetDirective(container, widgetRegistry);
    expect(directive).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should create a given component by type', () => {
      const directive = new DynamicWidgetDirective(container, widgetRegistry);
      directive.type = 'text';
      jest.spyOn(directive['widgetRegistry'], 'getWidgets').mockReturnValue({ text: { components: { widget: TextWidgetComponent } } as any });
      const createComponentSpy = jest.spyOn(container, 'createComponent');

      directive.ngOnInit();

      expect(createComponentSpy).toHaveBeenCalled();
    });

    it('should write info message to console if type doesn´t exist', () => {
      const directive = new DynamicWidgetDirective(container, widgetRegistry);
      directive.type = 'non-existing-type';
      jest.spyOn(directive['widgetRegistry'], 'getWidgets').mockReturnValue({ text: { components: { widget: TextWidgetComponent } } as any });
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn);

      directive.ngOnInit();

      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });
});
