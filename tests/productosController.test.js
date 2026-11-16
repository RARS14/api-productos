jest.mock('../src/models/Producto', () => ({
  find: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn()
}));

const Producto = require('../src/models/Producto');
const {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('../src/controllers/productosController');

function crearRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('productosController', () => {
  afterEach(() => jest.clearAllMocks());

  test('obtenerProductos devuelve la lista de productos', async () => {
    const lista = [{ nombre: 'Laptop' }, { nombre: 'Mouse' }];
    Producto.find.mockResolvedValue(lista);
    const res = crearRes();

    await obtenerProductos({}, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith(lista);
  });

  test('crearProducto responde 201 con el producto creado', async () => {
    const nuevo = { nombre: 'Teclado', precio: 900 };
    Producto.create.mockResolvedValue(nuevo);
    const res = crearRes();

    await crearProducto({ body: nuevo }, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(nuevo);
  });

  test('crearProducto responde 400 si faltan datos', async () => {
    const res = crearRes();

    await crearProducto({ body: { descripcion: 'sin nombre' } }, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(Producto.create).not.toHaveBeenCalled();
  });

  test('obtenerProductos pasa el error a next si falla la base de datos', async () => {
    Producto.find.mockRejectedValue(new Error('fallo'));
    const next = jest.fn();

    await obtenerProductos({}, crearRes(), next);

    expect(next).toHaveBeenCalled();
  });

  test('actualizarProducto devuelve el producto actualizado', async () => {
    const actualizado = { nombre: 'Mouse', precio: 300, stock: 25 };
    Producto.findByIdAndUpdate.mockResolvedValue(actualizado);
    const req = { params: { id: '507f1f77bcf86cd799439011' }, body: { precio: 300 } };
    const res = crearRes();

    await actualizarProducto(req, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith(actualizado);
  });

  test('actualizarProducto responde 404 si el producto no existe', async () => {
    Producto.findByIdAndUpdate.mockResolvedValue(null);
    const req = { params: { id: '507f1f77bcf86cd799439011' }, body: { precio: 1 } };
    const res = crearRes();

    await actualizarProducto(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('actualizarProducto responde 400 si el id no es válido', async () => {
    const req = { params: { id: '123' }, body: { precio: 1 } };
    const res = crearRes();

    await actualizarProducto(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(Producto.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  test('eliminarProducto responde con el mensaje de eliminado', async () => {
    Producto.findByIdAndDelete.mockResolvedValue({ nombre: 'Mouse' });
    const req = { params: { id: '507f1f77bcf86cd799439011' } };
    const res = crearRes();

    await eliminarProducto(req, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Producto eliminado' });
  });

  test('eliminarProducto responde 404 si el producto no existe', async () => {
    Producto.findByIdAndDelete.mockResolvedValue(null);
    const req = { params: { id: '507f1f77bcf86cd799439011' } };
    const res = crearRes();

    await eliminarProducto(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('eliminarProducto responde 400 si el id no es válido', async () => {
    const res = crearRes();

    await eliminarProducto({ params: { id: 'abc' } }, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(Producto.findByIdAndDelete).not.toHaveBeenCalled();
  });
});