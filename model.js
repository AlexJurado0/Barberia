const fs = require('fs');
const path = require('path');
const { Usuario } = require('./clases');
// Usuario
const getUsuarios = () => {
	const file = path.join(__dirname, 'db', 'usuarios.json');
  const data = fs.readFileSync(file, 'utf8');
	const usuariosData = JSON.parse(data);
  return usuariosData;
};

//Turnos
const getTurnos  = ()=>{
  const file = path.join(__dirname, 'db', 'turnos.json');
  const data = fs.readFileSync(file, 'utf-8');
  const turnosData = JSON.parse(data);
  return turnosData;
}

const setTurnos = (turno)=>{
  // Leer el archivo JSON existente
  const file = path.join(__dirname, 'db', 'turnos.json');
  const turnos = getTurnos();
  
  // Agregar el nuevo turno al array de turnos
  turnos.push(turno);

  // Guardar el nuevo turno en el archivo JSON
  fs.writeFileSync(file, JSON.stringify(turnos, null, 2), 'utf-8');
}

const confirmarTurno = (cliente) => {
  const file = path.join(__dirname, 'db', 'turnos.json');
  let turnos = getTurnos();

  console.log(cliente)
  turnos = turnos.map(turnos => {
    if (turnos.cliente === cliente) {
      turnos.estado = 'Confirmado';
    }
    return turnos;
  });

  fs.writeFileSync(file, JSON.stringify(turnos, null, 2), 'utf-8');
}


const cancelarTurno = (cliente) => {
  const file = path.join(__dirname, 'db', 'turnos.json');
  let turnos = getTurnos();

  turnos = turnos.map(turnos => {
    if (turnos.cliente === cliente) {
      turnos.estado = 'Cancelado';
    }
    return turnos;
  });

  fs.writeFileSync(file, JSON.stringify(turnos, null, 2), 'utf-8');
}

const filtrarTurnos = (estado) => {
  const file = path.join(__dirname, 'db', 'turnos.json');
  const turnos = getTurnos();
  const turnosfiltrados = turnos.filter(turno => turno.estado === estado);
  return turnosfiltrados;
};

const filtrarTurnosFecha = (fecha) => {
  const file = path.join(__dirname, 'db', 'turnos.json');
  const turnos = getTurnos();
  const turnosfiltrados = turnos.filter(turno => turno.date === fecha);
  return turnosfiltrados;
}

// panelCliente

const solicitarTurno = (turno) =>{
  setTurnos(turno);
}

module.exports = { getUsuarios, getTurnos, setTurnos, confirmarTurno, cancelarTurno, filtrarTurnos, filtrarTurnosFecha, solicitarTurno };