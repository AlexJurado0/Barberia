const model = require('./model');

const validarUsuario = (user, pass) => {
  const usuario = model.getUsuarios()

  for (let i = 0; i < usuario.length; i++) {
    if (usuario[i].user === user && usuario[i].pass === pass) {
      return true;
    }
  }
  return false;
};

module.exports = { validarUsuario };