const express = require('express');
const modelo = require('./model');
const seguridad = require('./seguridad');
const app = express();
const port = process.env.PORT || 3000;

const _url = "http://localhost:3000/";

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('login', { url: _url });
});

app.post('/panelAdmin', (req, res) => {
  const esValido = seguridad.validarUsuario(req.body.user, req.body.pass);
  console.log("Validando usuario: " + req.body.user + " con contraseña: " + req.body.pass);
  if(esValido) {
    const turnos = modelo.getTurnos();
    console.log("Usuario válido");
    res.render('panelAdmin' , { url: _url, turnos: turnos });
  } else {
    console.log("Usuario inválido");
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(modelo.getUsuarios());
});