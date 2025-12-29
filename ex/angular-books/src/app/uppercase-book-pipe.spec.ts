import { UppercaseBookPipe } from './uppercase-book-pipe';

describe('UppercaseBookPipe', () => {
  it('create an instance', () => {
    const pipe = new UppercaseBookPipe();
    expect(pipe).toBeTruthy();
  });
});
