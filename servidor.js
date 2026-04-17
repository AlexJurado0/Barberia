const express = require('express');
const fs = require('fs');
const path = require('path');
const modelo = require('./model');
const seguridad = require('./seguridad');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/panelAdmin', (req, res) => {
  const esValido = seguridad.validarUsuario(req.body.user, req.body.pass);
  console.log("Validando usuario: " + req.body.user + " con contraseña: " + req.body.pass);
  if(esValido) {
    const turnos = modelo.getTurnos();
    console.log("Usuario válido");
    res.sendFile(path.join(__dirname, 'public', 'panelAdmin.html'));
  } else {
    console.log("Usuario inválido");
    res.redirect('/');
  }
});


app.get("/api/turnos", (req, res) => {
  const filePath = path.join(__dirname, "db", "turnos.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "No se pudo leer el archivo" });
    }

    res.json(JSON.parse(data));
  });
});

app.get("/api/usuarios", (req, res) => {
  const filePath = path.join(__dirname, "db", "usuarios.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "No se pudo leer el archivo" });
    }

    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


app.get('/ping', (req, res) => {
  res.status(200).send('ok');
});