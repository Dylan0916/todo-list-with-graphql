import { MouseEvent } from 'react';

import { stopPropagation } from './eventHandlers';

describe('eventHandlers', () => {
  describe('stopPropagation', () => {
    it('should call stopPropagation when trigger', () => {
      const mockEvent = { stopPropagation: jest.fn() } as unknown as MouseEvent;

      stopPropagation(mockEvent);

      expect(mockEvent.stopPropagation).toBeCalled();
    });
  });
});
