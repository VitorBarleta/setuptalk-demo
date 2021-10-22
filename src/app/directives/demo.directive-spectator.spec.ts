import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { DemoDirective } from './demo.directive';

describe('DemoDirective', () => {
  let spectator: SpectatorDirective<DemoDirective>;
  const createDirective = createDirectiveFactory(DemoDirective);

  beforeEach(() => {
    spectator = createDirective(`<div demo></div>`);
  });

  it('should change the text content', () => {
    spectator.dispatchMouseEvent(spectator.element, 'mouseover');

    expect(spectator.element).toHaveExactText('hovering');

    spectator.dispatchMouseEvent(spectator.element, 'mouseout');
    expect(spectator.element).toHaveExactText('not hovering');
  });

  it('should get the instance', () => {
    const instance = spectator.directive;
    expect(instance).toBeDefined();
  });
});
