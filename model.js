const fs = require('fs');
const { Usuario } = require('./clases');

// Usuario
const getUsuarios = () => {
	const file = 'db/usuarios.json';
  const data = fs.readFileSync(file, 'utf8');
	const usuariosData = JSON.parse(data);
  return usuariosData;
};

//Turnos
const getTurnos  = ()=>{
  const file = 'db/turnos.json';
  const data = fs.readFileSync(file, 'utf-8');
  const turnosData = JSON.parse(data);
  return turnosData;
}

const setTurnos = (turno)=>{
  // Leer el archivo JSON existente
  const file = 'db/turnos.json';
  const turnos = getTurnos();
  
  // Agregar el nuevo turno al array de turnos
  turnos.push(turno);

  // Guardar el nuevo turno en el archivo JSON
  fs.writeFileSync(file, JSON.stringify(turnos, null, 2), 'utf-8');
}
module.exports = { getUsuarios, getTurnos, setTurnos };