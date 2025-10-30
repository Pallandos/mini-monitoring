import { getSystemInformation } from '../src/monitoring';

describe('getSystemInformation', () => {
  it('should return an object with all required system info properties', async () => {
    const data = await getSystemInformation();
    expect(data).toHaveProperty('cpu');
    expect(data).toHaveProperty('system');
    expect(data).toHaveProperty('mem');
    expect(data).toHaveProperty('os');
    expect(data).toHaveProperty('currentLoad');
    expect(data).toHaveProperty('processes');
    expect(data).toHaveProperty('diskLayout');
    expect(data).toHaveProperty('networkInterfaces');
  });

  it('should have cpu info with a manufacturer property', async () => {
    const data = await getSystemInformation();
    expect(data.cpu).toHaveProperty('manufacturer');
  });
});