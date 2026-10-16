import { SYSTEM_MIME_FAMILIES } from './system.model';

describe('SYSTEM_MIME_FAMILIES', () => {
  it('debería listar las cinco familias MIME que acepta el filtro', () => {
    expect(SYSTEM_MIME_FAMILIES).toEqual(['application', 'audio', 'image', 'text', 'video']);
  });
});
