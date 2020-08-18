import { BoolToStrPipe } from './bool-to-str.pipe';

describe('BoolToStrPipe', () => {
  it('create an instance', () => {
    const pipe = new BoolToStrPipe();
    expect(pipe).toBeTruthy();
  });
});
