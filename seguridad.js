const model = require('./model');

const validarUsuario = async(user, pass) => {
  const usuarios = await model.getUsuarios();

  const usuario = usuarios.find(u => u.user === user && u.pass === pass);

  return usuario ? true : false;
};

module.exports = { validarUsuario };