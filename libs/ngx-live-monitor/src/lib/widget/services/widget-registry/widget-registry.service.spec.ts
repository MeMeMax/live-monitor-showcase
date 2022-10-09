import { TestBed } from '@angular/core/testing';

import { TextWidgetComponent } from '../../components/text/text-widget/text-widget.component';
import { WidgetRegistryService } from './widget-registry.service';

describe('WidgetRegistryService', () => {
  let service: WidgetRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerWidget', () => {
    it('should register a new widget if it doesn´t exist', () => {
      const config = { type: 'text', components: { widget: TextWidgetComponent } };

      service.registerWidget(config);

      expect(service.getWidgets()['text']).toBeDefined();
    });

    it('should log an error if widget already exists', () => {
      const config = { type: 'text', components: { widget: TextWidgetComponent } };
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn);

      service.registerWidget(config);
      service.registerWidget(config);

      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });
});
