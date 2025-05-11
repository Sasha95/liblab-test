import { formatNumber } from './formatNumber';

describe('formatNumber', () => {
  it('formats numbers with commas', () => {
    expect(formatNumber(1000)).toBe('1.00B');
    expect(formatNumber(1234567)).toBe('1234.57B');
    expect(formatNumber(124)).toBe('124M');
  });
});
