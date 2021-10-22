import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator';
import { DemoPipe } from './demo.pipe';

describe('DemoPipe', () => {
  let spectator: SpectatorPipe<DemoPipe>;
  const createPipe = createPipeFactory({
    pipe: DemoPipe,
    template: '<div>{{ prop | avg }}</div>'
  });

  it('should compute the average of a given list of numbers', () => {
    spectator = createPipe({
        hostProps: {
            prop: [5,6,7]
        }
    });
    expect(spectator.element).toHaveText('6');
  });
});
