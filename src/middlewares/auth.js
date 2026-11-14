const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const encabezado = req.headers['authorization'];
  const token = encabezado && encabezado.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado: falta el token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido' });
    }
    req.usuario = usuario;
    next();
  });
}

module.exports = verificarToken;