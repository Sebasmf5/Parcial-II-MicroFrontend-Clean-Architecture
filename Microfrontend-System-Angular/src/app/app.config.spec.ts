import { appConfig } from './app.config';

describe('appConfig', () => {
  it('debería registrar los providers del microfrontend cuando se abre solo', () => {
    expect(appConfig.providers.length).toBe(4);
  });
});
