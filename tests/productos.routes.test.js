process.env.JWT_SECRET = 'secreto_de_prueba';

jest.mock('../src/models/Producto', () => ({
  find: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn()
}));

const request = require('supertest');
const jwt = require('jsonwebtoken');
const Producto = require('../src/models/Producto');
const app = require('../app');

const token = jwt.sign({ usuario: 'prueba' }, process.env.JWT_SECRET);

describe('Rutas de productos', () => {
  afterEach(() => jest.clearAllMocks());

  test('GET /api/productos sin token responde 401', async () => {
    const res = await request(app).get('/api/productos');

    expect(res.status).toBe(401);
  });

  test('GET /api/productos con token responde 200 y la lista', async () => {
    Producto.find.mockResolvedValue([{ nombre: 'Laptop' }]);

    const res = await request(app)
      .get('/api/productos')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ nombre: 'Laptop' }]);
  });

  test('POST /api/productos con token crea un producto', async () => {
    const nuevo = { nombre: 'Teclado', precio: 900 };
    Producto.create.mockResolvedValue(nuevo);

    const res = await request(app)
      .post('/api/productos')
      .set('Authorization', 'Bearer ' + token)
      .send(nuevo);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(nuevo);
  });

  test('GET /api/productos con token inválido responde 403', async () => {
    const res = await request(app)
      .get('/api/productos')
      .set('Authorization', 'Bearer token_falso');

    expect(res.status).toBe(403);
  });

  test('POST /api/productos sin nombre responde 400', async () => {
    const res = await request(app)
      .post('/api/productos')
      .set('Authorization', 'Bearer ' + token)
      .send({ descripcion: 'sin nombre' });

    expect(res.status).toBe(400);
  });

  test('DELETE /api/productos/:id responde 404 si no existe', async () => {
    Producto.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app)
      .delete('/api/productos/507f1f77bcf86cd799439011')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(404);
  });

  test('una ruta inexistente responde 404', async () => {
    const res = await request(app).get('/api/noexiste');

    expect(res.status).toBe(404);
  });
});