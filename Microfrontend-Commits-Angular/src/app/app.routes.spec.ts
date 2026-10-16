import { routes } from './app.routes';

describe('routes', () => {
  it('debería definir la ruta raíz de commits', () => {
    expect(routes.length).toBe(1);
    expect(routes[0].path).toBe('');
  });

  it('debería cargar el componente CommitsPage de forma diferida', async () => {
    const componente = await routes[0].loadComponent!();
    expect((componente as { name: string }).name).toBe('CommitsPage');
  });
});
