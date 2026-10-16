import { formatSize } from './format-size.util';

describe('formatSize', () => {
  it('debería mostrar los bytes cuando es menos de 1 KB', () => {
    expect(formatSize(512)).toBe('512 B');
  });

  it('debería mostrar kilobytes cuando es menos de 1 MB', () => {
    expect(formatSize(204800)).toBe('200.0 KB');
  });

  it('debería mostrar megabytes desde 1 MB', () => {
    expect(formatSize(1572864)).toBe('1.5 MB');
  });
});
