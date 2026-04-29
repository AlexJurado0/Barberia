const express = require('express');
const fs = require('fs');
const path = require('path');
const modelo = require('./model');
const seguridad = require('./seguridad');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

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


app.get('/panelCliente', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'panelCliente.html'));
});


//Turnos
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

app.post("/api/turnos/confirmar/:cliente", (req, res) => {
  const turnoId = req.params.cliente;
  const turnos = modelo.confirmarTurno(turnoId);
  res.status(200).json({ message: "Turno confirmado" });
})

app.post("/api/turnos/cancelar/:cliente", (req, res) => {
  const turnoId = req.params.cliente;
  const turnos = modelo.cancelarTurno(turnoId);
  res.status(200).json({ message: "Turno cancelado" });
})

app.get("/api/turnos/filtrar/:estado", (req, res) => {
  const estado = req.params.estado;
  const turnos = modelo.filtrarTurnos(estado);
  res.status(200).json(turnos);
});

app.get("/api/turnos/filtrar/fecha/:fecha", (req, res) => {
  const fecha = req.params.fecha;
  console.log("Filtrando turnos por fecha:", fecha);
  const turnos = modelo.filtrarTurnosFecha(fecha);
  res.status(200).json(turnos);
});
// Usuarios
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

app.get('/panelAdmin/gestionTurnos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gestionTurnos.html'));
});

// Barra Navegacion 
app.get("/api/logout/salir", (req,res) => {
  console.log("Cerrando sesión");
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
})


// Panel Cliente

app.post("/api/turnos/solicitar", (req, res) => {
  const turno = req.body;
  console.log("Turno recibido en el servidor:", turno);
  modelo.solicitarTurno(turno);
  res.status(200).json({ message: "Turno solicitado" });
});



app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


